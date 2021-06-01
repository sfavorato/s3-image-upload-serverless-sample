import 'source-map-support/register';
import { S3 } from 'aws-sdk';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { v4 as uuidv4 } from 'uuid';

import schema from './schema';
import { env } from 'src/environment/environment';

const preSignedUrl: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const s3 = new S3({ region: 'us-east-1' });

  const params = {
    Bucket: env.bucketName,
    Key: `uploads/${uuidv4()}/${event.body.fileName}`,
    Expires: 60
  }

  let response: any = {};

  try {
    response.preSignedUrl = await s3.getSignedUrlPromise('putObject', params);
  } catch (e) {
    console.log(e.message);
    response.errorMessage = e.message;
  }

  return formatJSONResponse(response);

}

export const main = middyfy(preSignedUrl);
