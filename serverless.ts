import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import preSignedUrl from '@functions/preSignedUrl';
import extractMetadata from '@functions/extractMetadata';

import { env } from 'src/environment/environment';

const serverlessConfiguration: AWS = {
  service: 's3-image-upload-serverless-sample',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack', 'serverless-iam-roles-per-function'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  resources: {
    Resources: {
      Images: {
        Type: "AWS::S3::Bucket",
        Properties: {
          BucketName: env.bucketName
        }
      }
    },
    Outputs: {
      ImageMagickLayerExport: {
        Value: {
          Ref: "ImageMagickLambdaLayer"
        },
        Export: {
          Name: "ImageMagickLambdaLayer"
        }
      }
    }
  },
  // import the function via paths
  functions: { hello, preSignedUrl, extractMetadata },
};

module.exports = serverlessConfiguration;
