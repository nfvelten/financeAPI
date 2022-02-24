import { User, UserPartial } from '@modules/users/domain/entities/User'

export const makeFakeUser = (): User => new User({
  name: 'any-name',
  createdBy: 'any-createdBy',
  email: 'any-email',
  password: 'any-password',
  role: 'admin'
})

export const makeFakeUserPartial = (): UserPartial => ({
  id: 'any-id',
  email: 'any@mail.com',
  name: 'any-name',
  role: 'admin'
})
