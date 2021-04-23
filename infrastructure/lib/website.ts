import * as cdk from '@aws-cdk/core';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as certificateManager from '@aws-cdk/aws-certificatemanager';
import { IBucket } from '@aws-cdk/aws-s3';

interface WebsiteProps extends cdk.StackProps {
	devSiteBucket: IBucket;
	passrCertificate: certificateManager.Certificate;
}

export class WebsiteStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props: WebsiteProps) {
		super(scope, id, props);

		const cloudfrontDev = new cloudfront.CloudFrontWebDistribution(
			this,
			'PassrSiteDevDistribution',
			{
				originConfigs: [
					{
						s3OriginSource: {
							s3BucketSource: props.devSiteBucket,
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
					props.passrCertificate,
					{
						aliases: ['dev.passr.ca'],
					}
				),
			}
		);
	}
}
