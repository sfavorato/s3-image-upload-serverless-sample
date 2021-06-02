import { handlerPath } from '@libs/handlerResolver';
import { env } from 'src/environment/environment';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  iamRoleStatementsName: 'lambda-extract-metadata',
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: [
        "s3:PutObject",
        "s3:GetObject"
      ],
      Resource: [env.bucketArn, `${env.bucketArn}/*`]
    }
  ],
  layers: ["arn:aws:lambda:us-east-1:321115293963:layer:image-magick:1"],
  events: [
    {
      s3: {
        bucket: env.bucketName,
        existing: true,
        event: "s3:ObjectCreated:Put",
        rules: [
          {
            prefix: "uploads/",
            suffix: ".png"
          }
        ]
      }
    }
  ]
}
