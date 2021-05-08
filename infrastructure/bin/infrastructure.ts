#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { WebsiteBuckets } from '../lib/website-buckets';
import { PipelineStack } from '../lib/pipeline';
import { DomainStack } from '../lib/domain';
import { FrontendStack } from '../lib/frontend';
import { MailStack } from '../lib/mail';
import { ProjectPrefix } from '../lib/variables';
const app = new cdk.App();

const websiteBuckets = new WebsiteBuckets(app, `${ProjectPrefix}-BucketStack`, {
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: process.env.CDK_DEFAULT_REGION,
	},
});

new PipelineStack(app, `${ProjectPrefix}-PipleineStack`, {
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: process.env.CDK_DEFAULT_REGION,
	},
	prodWebsiteBucket: websiteBuckets.prodSite,
	devWebsiteBucket: websiteBuckets.devSite,
});

new MailStack(app, `${ProjectPrefix}-MailStack`, {
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: process.env.CDK_DEFAULT_REGION,
	},
});

new FrontendStack(app, `${ProjectPrefix}-FrontendStack`, {
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: process.env.CDK_DEFAULT_REGION,
	},
	devSiteBucket: websiteBuckets.devSite,
	devOAI: websiteBuckets.devOAI,
	prodSiteBucket: websiteBuckets.prodSite,
	prodOAI: websiteBuckets.prodOAI,
});
