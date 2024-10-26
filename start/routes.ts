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
const UploadsController = () => import('#controllers/uploads_controller')

const UsersController = () => import('#controllers/users/users_controller')

const ValidateEmailsController = () => import('#controllers/views/auth/validate_emails_controller')

const ChildrenController = () => import('#controllers/children_controller')
const ChildContractsController = () => import('#controllers/contracts/child_contracts_controller')
const CalendarShareController = () =>
  import('#controllers/views/calendar/share/calendar_share_controller')
import { middleware } from '#start/kernel'

import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router
      .group(() => {
        router.post('register', [RegistersController, 'register'])
        router.post('edit-register/:id', [RegistersController, 'editRegister'])
        router.post('resend-email-validation/:id', [RegistersController, 'resendValidateEmail'])
        router.get('verify-email-validation/:id', [RegistersController, 'verifyEmailIsValidated'])
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
      .prefix('users')
      .use(middleware.auth())

    router
      .group(() => {
        router.post('exist', [UsersController, 'checkIfAlreadyExist'])
      })
      .prefix('users')

    router.resource('users', UsersController).apiOnly().use('*', middleware.auth())

    router
      .resource('event-template', EventTemplatesController)
      .apiOnly()
      .use('*', middleware.auth())

    router
      .group(() => {
        router.get('/child/:childId/contracts', [ChildContractsController, 'index'])
        router.post('/child/:childId/contracts', [ChildContractsController, 'store'])
        router.get('/child-contract/:id', [ChildContractsController, 'show'])
        router.patch('/child-contract/:id', [ChildContractsController, 'update'])
        router.delete('/child-contract/:id', [ChildContractsController, 'destroy'])
      })
      .use(middleware.auth())

    router.resource('child', ChildrenController).apiOnly().use('*', middleware.auth())

    router.resource('week-template', WeekTemplatesController).apiOnly().use('*', middleware.auth())

    // ajoutez cette route
    router.post('/upload', [UploadsController, 'upload'])

    router.get('/calendar/view/month/:year/:month', [CalendarShareController, 'month'])
    router.get('/calendar/view/week/:year/:week', [CalendarShareController, 'week'])

    router.get('/generate/pdf/calendar/month/:year/:month', [
      CalendarShareController,
      'generatePdfMonth',
    ])
    router.get('/generate/pdf/calendar/week/:year/:week', [
      CalendarShareController,
      'generatePdfWeek',
    ])
    router.get('/upload/:image', [UploadsController, 'getImage'])
    router.get('/', [TotoController])
  })
  .prefix('api')

router.get('/calendar/generate/month/:year/:month', [CalendarShareController, 'month'])
router.get('/calendar/generate/week/:year/:week', [CalendarShareController, 'week'])

router.get('/auth/validate-email/:storage', [ValidateEmailsController, 'index'])
