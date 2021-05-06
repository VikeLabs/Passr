import * as cdk from '@aws-cdk/core';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as certificateManager from '@aws-cdk/aws-certificatemanager';
import * as route53 from '@aws-cdk/aws-route53';
import * as route53Targets from '@aws-cdk/aws-route53-targets';
import { IBucket } from '@aws-cdk/aws-s3';
import { DomainName } from './variables';

interface WebsiteProps extends cdk.StackProps {
	devSiteBucket: IBucket;
	prodSiteBucket: IBucket;
	siteCertificate: certificateManager.Certificate;
	hostedZone: route53.IHostedZone;
}

export class FrontendStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props: WebsiteProps) {
		super(scope, id, props);

		const devOAI = new cloudfront.OriginAccessIdentity(this, 'DevOAI');

		props.devSiteBucket.grantRead(devOAI);

		const cloudfrontDev = new cloudfront.CloudFrontWebDistribution(
			this,
			'FrontendDevDistribution',
			{
				originConfigs: [
					{
						s3OriginSource: {
							s3BucketSource: props.devSiteBucket,
							originAccessIdentity: devOAI,
						},
						behaviors: [{ isDefaultBehavior: true }],
					},
				],
				defaultRootObject: 'index.html',
				errorConfigurations: [
					{
						errorCode: 404,
						responseCode: 200,
						responsePagePath: 'index.html',
					},
				],
				priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
				viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
					props.siteCertificate,
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
			zone: props.hostedZone,
			recordName: `dev.${DomainName}`,
			ttl: cdk.Duration.seconds(300),
		});

		const prodOAI = new cloudfront.OriginAccessIdentity(this, 'ProdOAI');

		props.prodSiteBucket.grantRead(prodOAI);

		const cloudfrontProd = new cloudfront.CloudFrontWebDistribution(
			this,
			'FrontendProdDistribution',
			{
				originConfigs: [
					{
						s3OriginSource: {
							s3BucketSource: props.prodSiteBucket,
							originAccessIdentity: prodOAI,
						},
						behaviors: [{ isDefaultBehavior: true }],
					},
				],
				defaultRootObject: 'index.html',
				errorConfigurations: [
					{
						errorCode: 404,
						responseCode: 200,
						responsePagePath: 'index.html',
					},
				],
				priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
				viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
					props.siteCertificate,
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
			zone: props.hostedZone,
			recordName: DomainName,
			ttl: cdk.Duration.seconds(300),
		});
	}
}
