#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { WebsiteBuckets } from '../lib/website-buckets';
import { PipelineStack } from '../lib/pipeline';
import { DomainStack } from '../lib/domain';
import { FrontendStack } from '../lib/frontend';
import { MailStack } from '../lib/mail';
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

const domainStack = new DomainStack(app, 'DomainStack', {
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: 'us-east-1',
	},
});

new MailStack(app, 'MailStack', {
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: process.env.CDK_DEFAULT_REGION,
	},
	hostedZone: domainStack.hostedZone,
});

new FrontendStack(app, 'WebsiteStack', {
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: process.env.CDK_DEFAULT_REGION,
	},
	devSiteBucket: websiteBuckets.devSite,
	prodSiteBucket: websiteBuckets.prodSite,
	siteCertificate: domainStack.domainCertificate,
	hostedZone: domainStack.hostedZone,
});
