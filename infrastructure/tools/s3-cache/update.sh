#!/bin/bash

S3_BUCKET="passr-tool-lambda-functions"
ZIP_FILE="s3-cache-lambda.zip"
FUNCTION_NAME="passr-s3-cache-lambda"

cd infrastructure/tools/s3-cache
npx rollup -c rollup.config.js
cd build/
zip "../$ZIP_FILE" *
cd ..

aws s3 cp "$ZIP_FILE" "s3://$S3_BUCKET/$ZIP_FILE"

aws lambda update-function-code --function-name $FUNCTION_NAME --s3-bucket "$S3_BUCKET" --s3-key "$ZIP_FILE" --publish
