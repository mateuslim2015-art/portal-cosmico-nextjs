
import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { createS3Client, getBucketConfig } from "./aws-config"

export async function uploadFile(buffer: Buffer, fileName: string): Promise<string> {
  const s3Client = createS3Client()
  const { bucketName, folderPrefix } = getBucketConfig()
  
  const key = `${folderPrefix}uploads/${Date.now()}-${fileName}`
  
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
    })
  )
  
  return key
}

export async function getFileUrl(key: string): Promise<string> {
  const s3Client = createS3Client()
  const { bucketName } = getBucketConfig()
  
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  })
  
  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
  return url
}

export async function deleteFile(key: string): Promise<void> {
  const s3Client = createS3Client()
  const { bucketName } = getBucketConfig()
  
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    })
  )
}
