import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as codebuild from '@aws-cdk/aws-codebuild';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import constants from './constants';

interface PipelineStackProps extends cdk.StackProps {
	devWebsiteBucket: s3.IBucket;
	prodWebsiteBucket: s3.IBucket;
}

export class PipelineStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props: PipelineStackProps) {
		super(scope, id, props);
		const pipelineArtifacts = new s3.Bucket(
			this,
			'FrontendPipelineArtifacts',
			{ blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL }
		);
		const buildProject = new codebuild.PipelineProject(
			this,
			'BuildProject',
			{
				cache: codebuild.Cache.bucket(pipelineArtifacts, {
					prefix: 'codebuild-cache',
				}),
				environment: {
					buildImage: codebuild.LinuxBuildImage.AMAZON_LINUX_2_3,
				},
			}
		);
		pipelineArtifacts.grantReadWrite(buildProject);
		const sourceArtifact = new codepipeline.Artifact('GithubSource');
		const buildArtifact = new codepipeline.Artifact('BuildArtifact');

		const pipeline = new codepipeline.Pipeline(this, 'FrontendPipeline', {
			artifactBucket: pipelineArtifacts,
			pipelineName: `${constants.PROJECT_PREFIX}FrontendPipeline`,
			stages: [
				{
					stageName: 'Source',
					actions: [
						new codepipeline_actions.GitHubSourceAction({
							actionName: 'Source',
							oauthToken: cdk.SecretValue.secretsManager(
								constants.GITHUB_SECRET_NAME,
								{
									jsonField: 'token',
								}
							),
							owner: constants.REPO_OWNER,
							repo: constants.FRONTEND_REPO,
							branch: constants.FRONTEND_MAIN_BRANCH,
							trigger: codepipeline_actions.GitHubTrigger.WEBHOOK,
							output: sourceArtifact,
						}),
					],
				},
				{
					stageName: 'Build',
					actions: [
						new codepipeline_actions.CodeBuildAction({
							actionName: 'BuildFrontend',
							input: sourceArtifact,
							project: buildProject,
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

		props.devWebsiteBucket.grantReadWrite(pipeline.role);
		props.prodWebsiteBucket.grantReadWrite(pipeline.role);
	}
}
