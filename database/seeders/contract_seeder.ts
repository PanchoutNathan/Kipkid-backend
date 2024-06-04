import Contract from '#models/contract'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Contract.createMany([
      {
        id: 1,
        lastName: 'Panchout',
        firstName: 'Owen',
        sex: 'boy',
        acl_read: [1],
        acl_write: [1],
        color: '#4132AD',
      },
      {
        id: 2,
        lastName: 'Panchout',
        firstName: 'Mavis',
        sex: 'girl',
        acl_read: [1],
        acl_write: [1],
        color: '#D93964',
      },
    ])
  }
}
