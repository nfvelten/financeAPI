import { User, UserDto } from '@modules/users/domain/entities/User'
import { makeFakeUserPartial } from '@tests/helpers/mocks'

describe('User', () => {
  describe('update', () => {
    it('should update an user', () => {
      const updatedBy = makeFakeUserPartial()
      const systemUnderTests = new User({
        id: 'any-id',
        role: 'admin',
        createdBy: 'any-id',
        email: 'any@mail',
        name: 'any-user',
        password: 'any-password'
      })

      systemUnderTests.update({
        role: 'editor',
        email: 'email',
        id: 'another-id'
      }, updatedBy)

      expect(systemUnderTests.toDto()).toEqual({
        id: 'another-id',
        role: 'editor',
        createdAt: expect.any(Date),
        createdBy: 'any-id',
        email: 'email',
        name: 'any-user',
        password: 'any-password',
        updatedAt: expect.any(Date),
        updatedBy
      } as UserDto)
    })
  })
})
