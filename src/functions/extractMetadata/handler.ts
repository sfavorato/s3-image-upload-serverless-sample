import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { S3Handler } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import { env } from 'src/environment/environment';

import { exec } from "child_process";

const extractMetadata: S3Handler = async (event) => {
  exec(`/opt/bin/magick --version`, (err, stdout, stderr) => {
    console.log("err", err);
    console.log("stdout", stdout);
    console.log("stderr", stderr);
  });
  
  const bucketInfo = event.Records[0].s3.bucket;
  const objectInfo = event.Records[0].s3.object;
  // const s3 = new S3({ region: env.region })

  const path = `s3://${bucketInfo.name}/${encodeURIComponent(objectInfo.key)}`

  // const params: S3.GetObjectRequest = {
  //   Bucket: bucketInfo.name,
  //   Key: objectInfo.key
  // }

  // const object = await s3.getObject(params).promise();

  // console.log(object);

  exec(`/opt/bin/magick identify ${path}`, (err, stdout, stderr) => {
    console.log("err", err);
    console.log("stdout", stdout);
    console.log("stderr", stderr);
  });
}

export const main = middyfy(extractMetadata);
