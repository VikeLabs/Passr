import * as cdk from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53';
import { DomainName, MXSPFRecords, MXReconds } from './variables';
import { SSMParameterReader } from './ssm-parameter-reader';
import { HostedZoneIdParam, HostedZoneNameParam } from './domain';

export class MailStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const hostedZoneIdReader = new SSMParameterReader(
			this,
			'Route53HostedZoneIdReader',
			{
				parameterName: HostedZoneIdParam,
				region: 'us-east-1',
			}
		);

		const hostedZoneNameReader = new SSMParameterReader(
			this,
			'Route53HostedZoneNameReader',
			{
				parameterName: HostedZoneNameParam,
				region: 'us-east-1',
			}
		);

		const hostedZoneId = hostedZoneIdReader.getParameterValue();
		const hostedZoneName = hostedZoneNameReader.getParameterValue();

		const hostedZone = route53.HostedZone.fromHostedZoneAttributes(
			this,
			'HostedZone',
			{
				zoneName: hostedZoneName,
				hostedZoneId,
			}
		);

		new route53.RecordSet(this, 'MXRecords', {
			recordType: route53.RecordType.MX,
			target: route53.RecordTarget.fromValues(...MXReconds),
			zone: hostedZone,
			ttl: cdk.Duration.hours(1),
		});

		new route53.RecordSet(this, 'vMXSPFRecords', {
			recordType: route53.RecordType.TXT,
			target: route53.RecordTarget.fromValues(...MXSPFRecords),
			zone: hostedZone,
			ttl: cdk.Duration.hours(1),
		});
	}
}
