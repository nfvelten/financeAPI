import { S3 } from 'aws-sdk'
import fs from 'fs'
import mimeTypes from 'mime-types'
import { resolve } from 'path'

import uploadConfig from '@config/upload'
import env from '@config/env'

import { IStorageProvider, StorageProviderDTO } from '..'

export class SpacesStorageProvider implements IStorageProvider {
  private readonly client: S3
  private readonly bucket: string
  private readonly projectFolder: string

  constructor () {
    this.bucket = env.spaces.bucket
    this.projectFolder = env.spaces.projectFolder

    this.client = new S3({
      endpoint: env.spaces.endpoint,
      region: env.spaces.region,
      accessKeyId: env.spaces.key,
      secretAccessKey: env.spaces.secret
    })
  }

  async save({ filename, folder }: StorageProviderDTO.Input): Promise<string> {
    const originalName = resolve(uploadConfig.directory, filename)

    const fileContent = await fs.promises.readFile(originalName)

    const ContentType = String(mimeTypes.lookup(filename))

    await this.client.putObject({
      Bucket: `${this.bucket}/${this.projectFolder}/${folder}`,
      Key: filename,
      ACL: 'public-read',
      Body: fileContent,
      ContentType
    }).promise()

    await fs.promises.unlink(originalName)

    return filename
  }

  async delete({ filename, folder }: StorageProviderDTO.Input): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${this.bucket}/${this.projectFolder}/${folder}`,
        Key: filename
      })
      .promise()
  }
}
