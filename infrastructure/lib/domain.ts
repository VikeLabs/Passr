import * as cdk from '@aws-cdk/core';
import * as certificateManager from '@aws-cdk/aws-certificatemanager';
import * as route53 from '@aws-cdk/aws-route53';
import * as ssm from '@aws-cdk/aws-ssm';
import constants from './constants';
export class DomainStack extends cdk.Stack {
	hostedZone = new route53.HostedZone(this, 'DomainHostedZone', {
		zoneName: constants.DOMAIN_NAME,
	});

	domainCertificate = new certificateManager.Certificate(
		this,
		'DomainCertificate',
		{
			domainName: constants.DOMAIN_NAME,
			subjectAlternativeNames: [`*.${constants.DOMAIN_NAME}`],
			validation: certificateManager.CertificateValidation.fromDns(
				this.hostedZone
			),
		}
	);

	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);
		new ssm.StringParameter(this, 'Route53HostedZoneIdSSMParam', {
			parameterName: constants.HOSTED_ZONE_ID_PARAM,
			stringValue: this.hostedZone.hostedZoneId,
		});

		new ssm.StringParameter(this, 'Route53HostedZoneNameSSMParam', {
			parameterName: constants.HOSTED_ZONE_NAME_PARAM,
			stringValue: this.hostedZone.zoneName,
		});

		new ssm.StringParameter(this, 'CertificateArnSSMParam', {
			parameterName: constants.CERTIFICATE_ARN_PARAM,
			stringValue: this.domainCertificate.certificateArn,
		});
	}
}
