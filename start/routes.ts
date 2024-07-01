/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const TotoController = () => import('#controllers/toto_controller')
const RegistersController = () => import('#controllers/auth/registers_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const LogoutsController = () => import('#controllers/auth/logouts_controller')
const MeController = () => import('#controllers/users/me_controller')
const GetContractsController = () => import('#controllers/contracts/get_contracts_controller')
const GetAllCalendarEventsController = () =>
  import('#controllers/calendar_events/get_all_calendar_events_controller')
const GetCalendarEventsController = () =>
  import('#controllers/calendar_events/get_calendar_events_controller')
const CreateCalendarEventController = () =>
  import('#controllers/calendar_events/create_calendar_event_controller')
const EventTemplatesController = () => import('#controllers/templates/event_templates_controller')
const WeekTemplatesController = () => import('#controllers/templates/week_templates_controller')
const ClockInCalendarEventController = () =>
  import('#controllers/calendar_events/clock_in_calendar_event_controller')
const UpdateCalendarEventController = () =>
  import('#controllers/calendar_events/update_calendar_event_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router
      .group(() => {
        router.post('register', [RegistersController])
        router.post('login', [LoginController])
        router.post('logout', [LogoutsController]).use(middleware.auth())
      })
      .prefix('auth')

    router
      .group(() => {
        router.get('/', [GetContractsController])
      })
      .prefix('contracts')

    router
      .group(() => {
        router.get('/', [GetAllCalendarEventsController])
        router.get('/:date', [GetCalendarEventsController])
        router.post('/:date/clock-in/:contract', [ClockInCalendarEventController])
        router.post('/:date/edit/:contract', [UpdateCalendarEventController])
        router.post('/', [CreateCalendarEventController])
      })
      .prefix('calendar-events')
      .use(middleware.auth())

    router
      .group(() => {
        router.get('me', [MeController])
      })
      .prefix('user')
      .use(middleware.auth())

    router
      .resource('event-template', EventTemplatesController)
      .apiOnly()
      .use('*', middleware.auth())

    router.resource('week-template', WeekTemplatesController).apiOnly().use('*', middleware.auth())

    // ajoutez cette route

    router.get('/', [TotoController])
  })
  .prefix('api')
router.on('/').renderInertia('home', { version: 6 })
