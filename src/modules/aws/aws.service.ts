import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class AwsService {
  bucketName = process.env.AWS_BUCKET_NAME;
  s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    try {
      const uploadResult = await this.s3
        .upload({
          Bucket: this.bucketName,
          Body: dataBuffer,
          Key: `${filename}`,
          ACL: 'public-read',
          ContentDisposition: 'inline',
        })
        .promise();

      return uploadResult;
    } catch (error) {
      console.log(error);
    }
  }
}
