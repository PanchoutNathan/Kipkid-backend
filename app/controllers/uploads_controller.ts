import UploadService from '#services/upload_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { createReadStream } from 'node:fs'

@inject()
export default class UploadsController {
  constructor(protected uploadService: UploadService) {}

  async upload({ request }: HttpContext) {
    const image = request.file('image')

    const disk = this.uploadService.disk

    const key = image?.clientName ?? 'profile.png'
    console.log(image?.tmpPath)
    const readable = createReadStream(image!.tmpPath!)

    await disk.putStream(key, readable)
    const url = await disk.getUrl(key)
    console.log(url)

    return { str: url ?? '' }
  }
  async getImage({ response, request }: HttpContext) {
    const imagePath = request.param('image')
    const file = await this.uploadService.getStream(imagePath)
    return response.stream(file)
  }
}
