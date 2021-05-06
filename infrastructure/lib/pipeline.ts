import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as codebuild from '@aws-cdk/aws-codebuild';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import {
	RepoOwner,
	PassrFrontendMainBranch,
	PassrFrontendRepo,
	GithubSecretName,
} from './variables';

interface PipelineStackProps extends cdk.StackProps {
	devWebsiteBucket: s3.IBucket;
	prodWebsiteBucket: s3.IBucket;
}

export class PipelineStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props: PipelineStackProps) {
		super(scope, id, props);
		const passrPipelineArtifacts = new s3.Bucket(
			this,
			'PassrSitePipelineArtifacts'
		);
		const passrBuild = new codebuild.PipelineProject(this, 'PassrBuild');
		const sourceArtifact = new codepipeline.Artifact('GithubSource');
		const buildArtifact = new codepipeline.Artifact('BuildArtifact');

		const pipeline = new codepipeline.Pipeline(this, 'PassrPipeline', {
			artifactBucket: passrPipelineArtifacts,
			pipelineName: 'PassrFrontendPipeline',
			stages: [
				{
					stageName: 'Source',
					actions: [
						new codepipeline_actions.GitHubSourceAction({
							actionName: 'Source',
							oauthToken: cdk.SecretValue.secretsManager(
								GithubSecretName
							),
							owner: RepoOwner,
							repo: PassrFrontendRepo,
							branch: PassrFrontendMainBranch,
							trigger: codepipeline_actions.GitHubTrigger.WEBHOOK,
							output: sourceArtifact,
						}),
					],
				},
				{
					stageName: 'Build',
					actions: [
						new codepipeline_actions.CodeBuildAction({
							actionName: 'BuildPassrFrontend',
							input: sourceArtifact,
							project: passrBuild,
							checkSecretsInPlainTextEnvVariables: true,
							outputs: [buildArtifact],
							type:
								codepipeline_actions.CodeBuildActionType.BUILD,
						}),
					],
				},
				{
					stageName: 'DeployDev',
					actions: [
						new codepipeline_actions.S3DeployAction({
							actionName: 'DevDeploy',
							bucket: props.devWebsiteBucket,
							input: buildArtifact,
							cacheControl: [
								codepipeline_actions.CacheControl.maxAge(
									cdk.Duration.seconds(0)
								),
							],
						}),
					],
				},
				{
					stageName: 'ProdApproval',
					actions: [
						new codepipeline_actions.ManualApprovalAction({
							actionName: 'ApproveProdDeploy',
						}),
					],
				},
				{
					stageName: 'DeployProd',
					actions: [
						new codepipeline_actions.S3DeployAction({
							actionName: 'ProdDeploy',
							bucket: props.prodWebsiteBucket,
							input: buildArtifact,
							cacheControl: [
								codepipeline_actions.CacheControl.maxAge(
									cdk.Duration.hours(1)
								),
							],
						}),
					],
				},
			],
		});

		new codepipeline.CfnWebhook(this, 'PassrSiteWebhook', {
			authentication: 'GITHUB_HMAC',
			authenticationConfiguration: {
				secretToken:
					'{{resolve:secretsmanager:github:SecretString:token}}',
			},
			filters: [
				{
					jsonPath: '$.ref',
					matchEquals: 'refs/heads/{Branch}',
				},
			],
			targetPipeline: pipeline.pipelineName,
			targetPipelineVersion: 1,
			targetAction:
				pipeline.stages[0].actions[0].actionProperties.actionName,
			name: 'PipelineWebhook',
			registerWithThirdParty: true,
		});

		props.devWebsiteBucket.grantReadWrite(pipeline.role);
		props.prodWebsiteBucket.grantReadWrite(pipeline.role);
	}
}
