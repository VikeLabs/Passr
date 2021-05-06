import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';

export class WebsiteBuckets extends cdk.Stack {
	devSite = new s3.Bucket(this, 'PassrDevSite', {
		blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
		versioned: true,
	});
	prodSite = new s3.Bucket(this, 'PassrProdSite', {
		blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
		versioned: true,
	});
	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);
	}
}
