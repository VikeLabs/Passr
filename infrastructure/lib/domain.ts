import * as cdk from '@aws-cdk/core';
import * as certificateManager from '@aws-cdk/aws-certificatemanager';
import * as route53 from '@aws-cdk/aws-route53';
import * as ssm from '@aws-cdk/aws-ssm';
import { DomainName } from './variables';

export const HostedZoneIdParam = 'ROUTE_53_HOSTED_ZONE_ID_SSM_PARAM';
export const HostedZoneNameParam = 'ROUTE_53_HOSTED_ZONE_NAME_PARAM';
export const CertificateArnParam = 'CERTIFICATE_ARN_PARAM';

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
		new ssm.StringParameter(this, 'Route53HostedZoneIdSSMParam', {
			parameterName: HostedZoneIdParam,
			stringValue: this.hostedZone.hostedZoneId,
		});

		new ssm.StringParameter(this, 'Route53HostedZoneNameSSMParam', {
			parameterName: HostedZoneNameParam,
			stringValue: this.hostedZone.zoneName,
		});

		new ssm.StringParameter(this, 'CertificateArnSSMParam', {
			parameterName: CertificateArnParam,
			stringValue: this.domainCertificate.certificateArn,
		});
	}
}
