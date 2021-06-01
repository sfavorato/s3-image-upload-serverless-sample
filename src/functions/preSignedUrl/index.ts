import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';
import { env } from 'src/environment/environment';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  iamRoleStatementsName: 'lambda-pre-signed-url',
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: [
        "s3:PutObject"
      ],
      Resource: [env.bucketArn, `${env.bucketArn}/*`]
    }
  ],
  events: [
    {
      http: {
        method: 'post',
        path: 'pre-signed-url',
        authorizer: {
          arn: env.cognitoArn,
          scopes: ["s3-images-sample/upload_images"]
        },
        request: {
          schema: {
            'application/json': schema
          }
        }
      }
    }
  ]
}
