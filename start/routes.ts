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
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.get('/', [TotoController])
router.get('/titi/toto', [TotoController])

router.get('/toto', async () => {
  return {
    hello: 'toto',
  }
})

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
        router.get('/:date/contract/:contractId', [GetCalendarEventsController])
      })
      .prefix('calendar-events')

    router
      .group(() => {
        router.get('me', [MeController])
      })
      .prefix('user')
      .use(middleware.auth())

    // ajoutez cette route

    router.get('/', [TotoController])
  })
  .prefix('api')
