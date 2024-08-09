import { Exception } from '@adonisjs/core/exceptions'

export default class UserAlreadyExistException extends Exception {
  static status = 409
}
