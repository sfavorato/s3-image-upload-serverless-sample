import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { S3Handler } from 'aws-lambda';
import { S3 } from 'aws-sdk';

import * as magick from 'imagemagick';
import { env } from 'src/environment/environment';

const magickIdentify = (path: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    magick.identify(path, (err, features) => {
      if (err) {
        reject(err);
      }
      resolve(features);
    })
  })
}

// {
//   "AcceptRanges": "bytes",
//   "LastModified": "2021-06-01T02: 59: 22.000Z",
//   "ContentLength": 83279,
//   "ETag": "b32a656d5008e8ac50c798d5fbe0a4bc",
//   "ContentType": "binary/octet-stream",
//   "Metadata": {},
//   "Body": "<Buffer 89 50 4e 47 0d 0a 1a 0a >"
// }

const extractMetadata: S3Handler = async (event) => {
  const bucketInfo = event.Records[0].s3.bucket;
  const objectInfo = event.Records[0].s3.object;
  const s3 = new S3({ region: env.region })

  const params: S3.GetObjectRequest = {
    Bucket: bucketInfo.name,
    Key: objectInfo.key
  }

  const object = await s3.getObject(params).promise();

  try {
    const result = await magickIdentify(object.Body.toString('utf-8'));
    console.log(result);
  } catch (err) {
    console.log(err);
  }

}

export const main = middyfy(extractMetadata);
