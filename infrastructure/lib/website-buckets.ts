import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as cloudfront from '@aws-cdk/aws-cloudfront';

import constants from './constants';

export class WebsiteBuckets extends cdk.Stack {
	devSite = new s3.Bucket(this, `${constants.PROJECT_PREFIX}-DevSite`, {
		blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
		versioned: true,
	});
	prodSite = new s3.Bucket(this, `${constants.PROJECT_PREFIX}-ProdSite`, {
		blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
		versioned: true,
	});
	devOAI = new cloudfront.OriginAccessIdentity(this, 'DevOAI');
	prodOAI = new cloudfront.OriginAccessIdentity(this, 'ProdOAI');

	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);
		this.prodSite.grantRead(this.prodOAI);
		this.devSite.grantRead(this.devOAI);
	}
}
