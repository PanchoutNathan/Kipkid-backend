import factory from '@adonisjs/lucid/factories'
import EventTemplate from '#models/event_template'

export const EventTemplateFactory = factory
  .define(EventTemplate, async ({ faker }) => {
    return {}
  })
  .build()