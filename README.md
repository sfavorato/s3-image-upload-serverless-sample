# S3 Image Upload Serverless
## About
This application deploys an API Gateway with associated Lambda Functions and all required AWS resources to process and upload images to AWS S3, using [Serverless Framework](https://www.serverless.com/) with configuration set using TypeScript instead of YAML

Endpoints requires authentication to be used, this configuration needs to be previously set on AWS Cognito

The main endpoint of this application create and returns a pre-signed URL with permission to upload an image file to S3 Bucket, with this URL, the client can upload the image directly to S3 without the need of a middleware application

Once the client finishes the image upload, another Lambda Function is triggered by the S3 event, which reads the file, extract the metadata and upload a new *json* file to the bucket containing the extracted metadata

All Metadata are being extracted using [Image Magick Tools](https://imagemagick.org/script/index.php), for this tool to work on Lambda, there is a Lambda Layer containing the binaries and all the dependencies already configured

Lambda Functions has individual roles associated with the minimum required permissions to execute

**Notes**\
Lambda Layer configuration for **node_modules** is not set, since the lastest version of serverless frameworks does not upload the whole node_modules folder to each Lambda as the previous versions did

Function *hello* is set as an example for syntax and Lambda configuration with no authentication required

## Setup
---
### System Requirements
- [NodeJs version 14.x](https://nodejs.org/dist/v14.17.0/node-v14.17.0-x64.msi)
- [AWS CLI v2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
### Installation
On project root folder
```
npm i
```
### Deploy
AWS CLI needs to be properly configured and set with the correct permissions to work
```
npm run deploy
```
### Testing
Tests are configured with Jest (unfinished)
```
npm run test
```

Each Lambda has its own mock file to be used to to invoke it locally
```
npm run invoke -- -f <function_name> -p <mock_file_path>
```