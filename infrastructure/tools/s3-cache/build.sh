#!/bin/bash

cd infrastructure/tools/s3-cache
npx rollup -c rollup.config.js
cd build/
zip ../s3-cache-lambda.zip *
