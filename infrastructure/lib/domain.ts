import * as cdk from '@aws-cdk/core';
import * as certificateManager from '@aws-cdk/aws-certificatemanager';
import * as route53 from '@aws-cdk/aws-route53';

export class InfrastructureStack extends cdk.Stack {
	hostedZone = new route53.HostedZone(this, 'PassrHostedZone', {
		zoneName: 'passr.ca',
	});

	passrCertificate = new certificateManager.Certificate(
		this,
		'PassrCertificate',
		{
			domainName: 'passr.ca',
			subjectAlternativeNames: ['*.passr.ca'],
			validation: certificateManager.CertificateValidation.fromDns(
				this.hostedZone
			),
		}
	);

	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		new route53.RecordSet(this, 'ImprovMXRecords', {
			recordType: route53.RecordType.MX,
			target: route53.RecordTarget.fromValues(
				'10 mx1.improvmx.com',
				'20 mx2.improvmx.com'
			),
			zone: this.hostedZone,
			recordName: 'passr.ca',
			ttl: cdk.Duration.seconds(300),
		});

		new route53.RecordSet(this, 'ImprovMXSPFRecords', {
			recordType: route53.RecordType.TXT,
			target: route53.RecordTarget.fromValues(
				'"v=spf1 include:spf.improvmx.com ~all"'
			),
			zone: this.hostedZone,
			recordName: 'passr.ca',
			ttl: cdk.Duration.seconds(300),
		});
	}
}
