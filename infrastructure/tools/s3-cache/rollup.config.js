import typescript from '@rollup/plugin-typescript';

export default {
  input: 's3-cache-lambda.ts',
  output: {
    file: '../build/s3-cache-lambda/index.js',
    format: 'cjs',
  },
  plugins: [typescript()],
};
