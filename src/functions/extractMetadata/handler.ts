import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { S3Handler } from 'aws-lambda';
import { S3 } from 'aws-sdk';

import { subClass } from 'gm';
import { env } from 'src/environment/environment';

const magickIdentify = (file: Buffer): Promise<any> => {
  const gm = subClass({ imageMagick: true });
  return new Promise((resolve, reject) => {
    gm(file).identify({ bufferStream: true }, (err, value) => {
      if (err) {
        reject(err);
      }
      resolve(value);
    });
  })
}

const extractMetadata: S3Handler = async (event) => {
  const bucketInfo = event.Records[0].s3.bucket;
  const objectInfo = event.Records[0].s3.object;
  const s3 = new S3({ region: env.region })

  const getObjectParams: S3.GetObjectRequest = {
    Bucket: bucketInfo.name,
    Key: objectInfo.key
  }

  const object = await s3.getObject(getObjectParams).promise();

  try {
    const result = await magickIdentify(object.Body as Buffer);

    const paths = objectInfo.key.split('/');
    const savePath = `${paths[0]}/${paths[1]}/metadata.json`

    const putObjectParams: S3.PutObjectRequest = {
      Bucket: bucketInfo.name,
      Key: savePath,
      Body: Buffer.from(JSON.stringify(result)),
      ContentType: 'application/json'
    }

    const response = await s3.putObject(putObjectParams).promise();

    console.log(response);
  } catch (err) {
    console.log(err);
  }

}

export const main = middyfy(extractMetadata);
