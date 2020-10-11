import typescript from '@rollup/plugin-typescript';

export default {
  input: 's3-cache-lambda.ts',
  external: ['aws-sdk'],
  output: {
    file: 'build/index.js',
    format: 'cjs',
  },
  plugins: [typescript()],
};
