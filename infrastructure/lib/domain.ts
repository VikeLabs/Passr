import * as cdk from '@aws-cdk/core';
import * as certificateManager from '@aws-cdk/aws-certificatemanager';
import * as route53 from '@aws-cdk/aws-route53';
import { DomainName } from './variables';
export class DomainStack extends cdk.Stack {
	hostedZone = new route53.HostedZone(this, 'DomainHostedZone', {
		zoneName: DomainName,
	});

	domainCertificate = new certificateManager.Certificate(
		this,
		'DomainCertificate',
		{
			domainName: DomainName,
			subjectAlternativeNames: [`*.${DomainName}`],
			validation: certificateManager.CertificateValidation.fromDns(
				this.hostedZone
			),
		}
	);

	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);
	}
}
