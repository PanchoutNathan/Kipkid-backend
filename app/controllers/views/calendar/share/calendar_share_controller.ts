// import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import jwt from 'jsonwebtoken'

import { serializeLightEventWithContract } from '#normalizers/event_calendar_normalizer'
import CalendarEventService from '#services/calendar_event_service'
import UploadService from '#services/upload_service'
import env from '#start/env'
import { LightEventWithContractByDates } from '#types/calendar_event'
import { groupBy } from '#utils/clean'
import dayjs from '#utils/custom_dayjs'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

import { Readable } from 'node:stream'
import puppeteer from 'puppeteer'

@inject()
export default class CalendarShareController {
  constructor(
    protected service: CalendarEventService,
    protected uploadService: UploadService
  ) {}

  async month({ bouncer, inertia, params }: HttpContext) {
    const { year, month } = params

    if (+month < 0 || +month > 11) {
      return 'Vous devez choisir un mois entre 0 et 11'
    }

    const user = await User.findOrFail(1)
    // await bouncer.with(AdminPolicy).authorize('canGeneratePDF')
    let firstDay = dayjs().year(year).month(month).startOf('month').format('YYYY-MM-DD')
    let lastDay = dayjs().year(year).month(month).endOf('month').format('YYYY-MM-DD')

    const events = await this.service.getEventsBetweenDates(user, firstDay, lastDay)
    const serialized = serializeLightEventWithContract(events)
    const eventsByDates: LightEventWithContractByDates = groupBy(serialized, (event) => event.date)

    return inertia.render('planning/generate/month', {
      year: +year,
      month: +month,
      allEvents: eventsByDates,
    })
  }

  async week({ bouncer, inertia, params }: HttpContext) {
    const user = await User.findOrFail(1)
    const { year, week } = params
    if (+week < 1 || +week > 53) {
      return 'Vous devez choisir une semaine entre 1 et 53'
    }
    // await bouncer.with(AdminPolicy).authorize('canGeneratePDF')
    let firstDay = dayjs().year(year).week(week).startOf('week').format('YYYY-MM-DD')
    let lastDay = dayjs().year(year).week(week).endOf('week').format('YYYY-MM-DD')
    const events = await this.service.getEventsBetweenDates(user, firstDay, lastDay)
    const serialized = serializeLightEventWithContract(events)
    const eventsByDates: LightEventWithContractByDates = groupBy(serialized, (event) => event.date)

    return inertia.render('planning/generate/week', {
      year: +year,
      week: +week,
      allEvents: eventsByDates,
    })
  }

  async generatePdfMonth({ response, params, request: req }: HttpContext) {
    const { month, year } = params
    const token = jwt.sign({ admin: true }, env.get('ADMIN_SECRET'))
    const browser = await puppeteer.connect({
      browserWSEndpoint: `ws://localhost:3000?token=6R0W53R135510&&`,
    })
    const page = await browser.newPage()
    await page.emulateTimezone('Europe/Paris')
    await page.goto(
      `${req.protocol() + '://' + req.host()}/calendar/generate/month/${year}/${month}?token=${token}`,
      {
        waitUntil: 'networkidle0',
      }
    )

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

  async generatePdfWeek({ response, params, request: req }: HttpContext) {
    const { week, year } = params
    const token = jwt.sign({ admin: true }, env.get('ADMIN_SECRET'))
    const browser = await puppeteer.connect({
      browserWSEndpoint: `ws://localhost:3000?token=6R0W53R135510&&`,
    })
    const page = await browser.newPage()
    await page.emulateTimezone('Europe/Paris')
    await page.goto(
      `${req.protocol() + '://' + req.host()}/calendar/generate/week/${year}/${week}?token=${token}`,
      {
        waitUntil: 'networkidle0',
      }
    )

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
