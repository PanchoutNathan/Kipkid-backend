import env from '#start/env'
import { Disk } from 'flydrive'
import { S3Driver } from 'flydrive/drivers/s3'
import { createReadStream } from 'node:fs'

export default class UploadService {
  disk: Disk

  constructor() {
    this.disk = new Disk(
      new S3Driver({
        credentials: {
          accessKeyId: env.get('CLOUDFLARE_R2_ACCESS_ID', ''),
          secretAccessKey: env.get('CLOUDFLARE_R2_SECRET', ''),
        },

        endpoint: env.get('CLOUDFLARE_R2_ENDPOINT', ''),
        region: 'auto',
        supportsACL: false,

        bucket: 'kipkid',
        visibility: 'public',
      })
    )
  }

  async upload(tmpPath: string, key: string) {
    const readable = createReadStream(tmpPath)
    await this.disk.putStream(key, readable)
  }

  async getStream(key: string) {
    const file = await this.disk.getStream(key)
    return file
  }

  async getUrl(key: string) {
    const url = this.disk.getUrl(key)
    return url
  }

  async getSignedUrl(key: string) {
    const url = this.disk.getSignedUrl(key, { expiresIn: 'never' })
    return url
  }
}
