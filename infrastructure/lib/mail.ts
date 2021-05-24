import * as cdk from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53';
import constants from './constants';
import ParamFactories from './param-factories';
export class MailStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const hostedZoneName = ParamFactories.HostedZoneName(
			this,
			'HostedZoneName'
		);

		const hostedZoneId = ParamFactories.HostedZoneId(this, 'HostedZoneId');

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
			target: route53.RecordTarget.fromValues(...constants.MX_RECORDS),
			zone: hostedZone,
			ttl: cdk.Duration.hours(1),
		});

		new route53.RecordSet(this, 'vMXSPFRecords', {
			recordType: route53.RecordType.TXT,
			target: route53.RecordTarget.fromValues(
				...constants.MX_SPF_RECORDS
			),
			zone: hostedZone,
			ttl: cdk.Duration.hours(1),
		});
	}
}
