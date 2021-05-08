import * as cdk from '@aws-cdk/core';
import { DomainStack } from '../lib/domain';

const app = new cdk.App();

new DomainStack(app, 'DomainStack', {
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: 'us-east-1',
	},
});
