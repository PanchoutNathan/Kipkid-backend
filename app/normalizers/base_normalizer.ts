import User from '#models/user'

export abstract class BaseNormalizer<Model, Normalized> {
  currentUser: User
  constructor(protected u: User) {
    this.currentUser = u
  }

  normalizeArray(entities: Model[]): Normalized[] {
    const result: Normalized[] = []
    entities.map((en) => {
      result.push(this.normalize(en))
    })
    return result
  }

  abstract normalize(entity: Model): Normalized
}
