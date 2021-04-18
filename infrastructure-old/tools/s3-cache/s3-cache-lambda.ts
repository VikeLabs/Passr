import { S3, CodePipeline } from 'aws-sdk';

const fileToModifyCache = ['index.html'];
const s3 = new S3();
const codepipeline = new CodePipeline();

export function handler(event: string, context: any) {
	const jobId = event['CodePipeline.job'].id;
	const putJobFailure = function (message: any) {
		const params = {
			jobId,
			failureDetails: {
				message: JSON.stringify(message),
				type: 'JobFailed',
				externalExecutionId: context.awsRequestId,
			},
		};
		codepipeline.putJobFailureResult(params, (err, data) => {
			context.fail(message);
		});
	};

	const putJobSuccess = function (message: any) {
		const params = {
			jobId,
		};
		codepipeline.putJobSuccessResult(params, (err, data) => {
			if (err) {
				context.fail(err);
			} else {
				context.succeed(message);
			}
		});
	};
	try {
		const userParams = JSON.parse(
			event['CodePipeline.job'].data.actionConfiguration.configuration
				.UserParameters
		);
		console.log(userParams);
		for (const file of fileToModifyCache) {
			const getParams = {
				Bucket: userParams.Bucket,
				Key: file,
				Range: 'bytes=0-9', // Just get 10 bytes, we don't care about the data here.
			};
			s3.getObject(getParams, (err, data) => {
				if (err) {
					putJobFailure(err);
					return;
				}
				const copyParams = {
					Bucket: userParams.Bucket,
					CopySource: `/${userParams.Bucket}/${file}`,
					Key: file,
					ContentType: data.ContentType,
					CacheControl: `max-age=${userParams.MaxAge}`,
					MetadataDirective: 'REPLACE',
				};

				s3.copyObject(copyParams, (err, data) => {
					if (err) {
						console.error(err);
						putJobFailure(err);
						return;
					}

					console.log(data);
					putJobSuccess('Successfully set cache headers');
				});
			});
		}
	} catch (err) {
		console.error(err);
		putJobFailure(err);
	}
}

export default handler;
