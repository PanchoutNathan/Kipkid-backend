import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        id: 1,
        email: 'nathanpanchout@live.fr',
        password: 'azerty',
      },
    ])
    // Write your database queries inside the run method
  }
}
