import Asm from '#models/asm'
import ChildContract from '#models/child_contract'
import User from '#models/user'
import ChildContractQuery from '#queries/child_contract_query'
import { DTOContractCreate } from '#types/child_contract'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

@inject()
export default class ChildContractService {
  constructor(protected ctx: HttpContext) {}

  async create(paylaod: DTOContractCreate, fromUser: User): Promise<ChildContract> {
    let contract = new ChildContract()
    let newAsm = new Asm()
    const { asmData, startDate, ...other } = paylaod
    const {
      birthday,
      pajeId,
      pajeNumber,
      agreementNumber,
      agreementDate,
      renewAgreementDate,
      civilAssuranceNumber,
      carAssuranceNumber,
      ...otherAsmData
    } = asmData

    newAsm.merge(otherAsmData)

    if (birthday) {
      newAsm.birthday = DateTime.fromJSDate(birthday)
    }
    newAsm.settings = {
      pajeId,
      pajeNumber,
      agreementNumber,
      agreementDate,
      renewAgreementDate,
      civilAssuranceNumber,
      carAssuranceNumber,
    }
    newAsm = await newAsm.save()

    contract.childId = other.childId
    contract.userId = fromUser.id
    contract.asmId = newAsm.id
    contract.startDate = DateTime.fromISO(startDate)
    contract.merge({ ...other, acl_read: [fromUser.id], acl_write: [fromUser.id] })
    contract = await contract.save()
    await contract.load('asm')
    await contract.load('child')
    await contract.load('user')
    return contract
  }

  async getAlLChildrenContracts(childId: number): Promise<ChildContract[]> {
    const user = this.ctx.auth.getUserOrFail()
    return ChildContractQuery.new(user).where('childId', '=', childId).withChild().withAsm().query
  }

  async getChildContractCanUpdate(user: User): Promise<ChildContract[]> {
    return ChildContractQuery.new(user).withChild().withAsm().canUpdate(user).query
  }

  async getById(contractId: number): Promise<ChildContract | null> {
    const contract = await ChildContract.find(contractId)
    if (!contract) {
      return null
    }
    await contract.load('asm')
    await contract.load('user')
    await contract.load('child')
    return contract
  }
}
