import * as cdk from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53';
import { DomainName, MXSPFRecords, MXReconds } from './variables';

interface MailProps extends cdk.StackProps {
	hostedZone: route53.IHostedZone;
}

export class MailStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props: MailProps) {
		super(scope, id, props);

		new route53.RecordSet(this, 'MXRecords', {
			recordType: route53.RecordType.MX,
			target: route53.RecordTarget.fromValues(...MXReconds),
			zone: props.hostedZone,
			recordName: DomainName,
			ttl: cdk.Duration.hours(1),
		});

		new route53.RecordSet(this, 'vMXSPFRecords', {
			recordType: route53.RecordType.TXT,
			target: route53.RecordTarget.fromValues(...MXSPFRecords),
			zone: props.hostedZone,
			recordName: DomainName,
			ttl: cdk.Duration.hours(1),
		});
	}
}
