#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { WebsiteBuckets } from '../lib/website-buckets';
import { PipelineStack } from '../lib/pipeline';
import { DomainStack } from '../lib/domain';
import { FrontendStack } from '../lib/frontend';
import { MailStack } from '../lib/mail';
import constants from '../lib/constants';

const app = new cdk.App();

const websiteBuckets = new WebsiteBuckets(
	app,
	`${constants.PROJECT_PREFIX}-BucketStack`,
	{
		env: {
			account: process.env.CDK_DEFAULT_ACCOUNT,
			region: process.env.CDK_DEFAULT_REGION,
		},
	}
);

new PipelineStack(app, `${constants.PROJECT_PREFIX}-PipelineStack`, {
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: process.env.CDK_DEFAULT_REGION,
	},
	prodWebsiteBucket: websiteBuckets.prodSite,
	devWebsiteBucket: websiteBuckets.devSite,
});

new MailStack(app, `${constants.PROJECT_PREFIX}-MailStack`, {
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: process.env.CDK_DEFAULT_REGION,
	},
});

new FrontendStack(app, `${constants.PROJECT_PREFIX}-FrontendStack`, {
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: process.env.CDK_DEFAULT_REGION,
	},
	devSiteBucket: websiteBuckets.devSite,
	devOAI: websiteBuckets.devOAI,
	prodSiteBucket: websiteBuckets.prodSite,
	prodOAI: websiteBuckets.prodOAI,
});
