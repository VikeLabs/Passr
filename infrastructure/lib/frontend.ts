import * as cdk from '@aws-cdk/core';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as certificateManager from '@aws-cdk/aws-certificatemanager';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53Targets from '@aws-cdk/aws-route53-targets';
import { IBucket } from '@aws-cdk/aws-s3';
import { DomainName } from './variables';
import { SSMParameterReader } from './ssm-parameter-reader';
import {
	HostedZoneIdParam,
	CertificateArnParam,
	HostedZoneNameParam,
} from './domain';

interface WebsiteProps extends cdk.StackProps {
	devSiteBucket: IBucket;
	prodSiteBucket: IBucket;
	devOAI: cloudfront.IOriginAccessIdentity;
	prodOAI: cloudfront.IOriginAccessIdentity;
}

export class FrontendStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props: WebsiteProps) {
		super(scope, id, props);

		const hostedZoneIdReader = new SSMParameterReader(
			this,
			'Route53HostedZoneIdReader',
			{
				parameterName: HostedZoneIdParam,
				region: 'us-east-1',
			}
		);

		const hostedZoneNameReader = new SSMParameterReader(
			this,
			'Route53HostedZoneNameReader',
			{
				parameterName: HostedZoneNameParam,
				region: 'us-east-1',
			}
		);

		const hostedZoneId = hostedZoneIdReader.getParameterValue();
		const hostedZoneName = hostedZoneNameReader.getParameterValue();

		const hostedZone = route53.HostedZone.fromHostedZoneAttributes(
			this,
			'HostedZone',
			{
				zoneName: hostedZoneName,
				hostedZoneId,
			}
		);

		const certificateArnReader = new SSMParameterReader(
			this,
			'CertificateArnReader',
			{
				parameterName: CertificateArnParam,
				region: 'us-east-1',
			}
		);

		const certificateArn = certificateArnReader.getParameterValue();

		const certificate = certificateManager.Certificate.fromCertificateArn(
			this,
			'DomainCertificate',
			certificateArn
		);

		const cloudfrontDev = new cloudfront.CloudFrontWebDistribution(
			this,
			'FrontendDevDistribution',
			{
				originConfigs: [
					{
						s3OriginSource: {
							s3BucketSource: props.devSiteBucket,
							originAccessIdentity: props.devOAI,
						},
						behaviors: [{ isDefaultBehavior: true }],
					},
				],
				defaultRootObject: 'index.html',
				errorConfigurations: [
					{
						errorCode: 404,
						responseCode: 200,
						responsePagePath: '/index.html',
					},
				],
				priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
				viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
					certificate,
					{
						aliases: [`dev.${DomainName}`],
					}
				),
			}
		);

		const cloudfrontDevTarget = new route53Targets.CloudFrontTarget(
			cloudfrontDev
		);

		new route53.RecordSet(this, 'FrontendDevRecord', {
			recordType: route53.RecordType.A,
			target: route53.RecordTarget.fromAlias(cloudfrontDevTarget),
			zone: hostedZone,
			recordName: 'dev',
			ttl: cdk.Duration.seconds(300),
		});

		const cloudfrontProd = new cloudfront.CloudFrontWebDistribution(
			this,
			'FrontendProdDistribution',
			{
				originConfigs: [
					{
						s3OriginSource: {
							s3BucketSource: props.prodSiteBucket,
							originAccessIdentity: props.prodOAI,
						},
						behaviors: [{ isDefaultBehavior: true }],
					},
				],
				defaultRootObject: 'index.html',
				errorConfigurations: [
					{
						errorCode: 404,
						responseCode: 200,
						responsePagePath: '/index.html',
					},
				],
				priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
				viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
					certificate,
					{
						aliases: [DomainName],
					}
				),
			}
		);

		const cloudfrontProdTarget = new route53Targets.CloudFrontTarget(
			cloudfrontProd
		);

		new route53.RecordSet(this, 'FrontendProdRecord', {
			recordType: route53.RecordType.A,
			target: route53.RecordTarget.fromAlias(cloudfrontProdTarget),
			zone: hostedZone,
			ttl: cdk.Duration.seconds(300),
		});
	}
}
