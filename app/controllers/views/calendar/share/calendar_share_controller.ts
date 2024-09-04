// import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import CalendarEventService from '#services/calendar_event_service'
import UploadService from '#services/upload_service'
import { LightEventWithContract, LightEventWithContractByDates } from '#types/calendar_event'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import dayjs from 'dayjs'
import { Readable } from 'node:stream'
import puppeteer from 'puppeteer'

@inject()
export default class CalendarShareController {
  constructor(
    protected service: CalendarEventService,
    protected uploadService: UploadService
  ) {}

  async index({ inertia, params }: HttpContext) {
    const user = await User.find(1)
    const { year, month } = params
    if (!user) {
      return null
    }

    let firstDay = dayjs().year(year).month(month).startOf('month').format('YYYY-MM-DD')
    let lastDay = dayjs().year(year).month(month).endOf('month').format('YYYY-MM-DD')
    const events = await this.service.getEventsBetweenDates(user, firstDay, lastDay)
    const serialized = events.map((event) => {
      return event.serialize({
        fields: {
          pick: ['id', 'events', 'date'],
        },
        relations: {
          contract: {
            fields: ['id'],
            relations: {
              child: {
                fields: ['color', 'sticker', 'firstName', 'lastName'],
              },
            },
          },
        },
      }) as LightEventWithContract
    })

    const eventsByDates: LightEventWithContractByDates = {}
    serialized.forEach((event) => {
      const before = eventsByDates[event.date] ?? []
      before.push(event)
      eventsByDates[event.date] = before
    })

    return inertia.render('home', { year: +year, month: +month, allEvents: eventsByDates })
  }

  async testing({ response }: HttpContext) {
    const browser = await puppeteer.connect({
      browserWSEndpoint: `ws://localhost:3000?token=6R0W53R135510&&`,
    })
    const page = await browser.newPage()
    await page.emulateTimezone('Europe/Paris')
    await page.goto('http://192.168.0.18:8000/calendar/generate/month/2024/7', {
      waitUntil: 'networkidle0',
    })

    // Saves the PDF to hn.pdf.
    page.emulateMediaType('screen')
    const pdf = await page.pdf({
      path: 'hn.pdf',
      format: 'A4',
      landscape: true,
      printBackground: true,
      pageRanges: '1',
    })

    await browser.close()
    const buffer = Buffer.from(pdf)
    const stream = Readable.from(buffer)

    // await mail.send((message) => {
    //   message
    //     .from('contact@kipcorp.fr')
    //     .to('nathanpanchout@live.fr')
    //     .attachData(Buffer.from(buffer), {
    //       filename: 'planning.pdf',
    //     })
    //     .subject(`Planning pour le mioche`)
    //     .text('Tu vois, ici tu va retrouver ton PDF espèce de petit incapble')
    // })

    return response.stream(stream)
  }
}
