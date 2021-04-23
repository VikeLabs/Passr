#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
// import { InfrastructureStack } from '../lib/infrastructure-stack';
import { WebsiteBuckets } from '../lib/website-buckets';
import { PipelineStack } from '../lib/pipeline';
const app = new cdk.App();

const websiteBuckets = new WebsiteBuckets(app, 'WebisteBucketsStack', {
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: process.env.CDK_DEFAULT_REGION,
	},
});

new PipelineStack(app, 'InfrastructureStack', {
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: process.env.CDK_DEFAULT_REGION,
	},
	prodWebsiteBucket: websiteBuckets.prodSite,
	devWebsiteBucket: websiteBuckets.devSite,
});
