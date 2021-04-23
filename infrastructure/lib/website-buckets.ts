import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as codebuild from '@aws-cdk/aws-codebuild';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';

export class WebsiteBuckets extends cdk.Stack {
	devSite = new s3.Bucket(this, 'PassrDevSite', {
		versioned: true,
	});
	prodSite = new s3.Bucket(this, 'PassrProdSite', {
		versioned: true,
	});
	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);
	}
}
