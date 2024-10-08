import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { IDataUploadImage } from 'src/interfaces/IDataUploadImage';

const s3Client = new S3Client({
  region: 'us-east-1',
  endpoint: process.env.BUCKET_ENDPOINT,
  credentials: {
    accessKeyId: process.env.BUCKET_ACESS_KEY,
    secretAccessKey: process.env.BUCKET_SECRET_KEY,
  },
  forcePathStyle: true,
});

export async function uploadFile(
  path: string,
  buffer: Buffer,
  mimetype: string,
): Promise<IDataUploadImage> {
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: path,
    Body: buffer,
    ContentType: mimetype,
  };
  const command = new PutObjectCommand(params);

  await s3Client.send(command);
  const image = {
    url: `${process.env.BUCKET_ENDPOINT}/${process.env.BUCKET_NAME}/${path}`,
    path: path,
  };
  return image;
}
