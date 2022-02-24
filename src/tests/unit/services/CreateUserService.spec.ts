import crypto from 'crypto'
import AppError from '@shared/errors/AppError'
import { Mocked } from '@tests/helpers'
import { CreateUserService } from '@modules/users/application/services'
import { IUsersRepository } from '@modules/users/application/repositories/IUsersRepository'
import { makeFakeUser } from '@tests/helpers/mocks'
import { IHashProvider } from '@shared/application/providers'
import { CreateUser } from '@modules/users/domain/features/CreateUser'
import { User } from '@modules/users/domain/entities/User'
import { IMailProvider } from '@shared/application/providers/MailProvider'

describe('CreateUserService', () => {
  let usersRepository: Mocked<IUsersRepository>
  let hashProvider: Mocked<IHashProvider>
  let mailProvider: Mocked<IMailProvider>
  let args: CreateUser.Input
  let systemUnderTests: CreateUserService

  beforeAll(() => {
    usersRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      save: jest.fn().mockResolvedValue(makeFakeUser())
    }

    hashProvider = {
      hash: jest.fn().mockResolvedValue('hash'),
      compare: jest.fn()
    }

    mailProvider = {
      sendMail: jest.fn().mockReturnValue(Promise.resolve())
    }

    args = {
      userData: {
        name: 'any retirement organization',
        email: 'any retirement organization',
        role: 'admin',
        sendPasswordViaEmail: false
      },
      systemParams: { userId: 'any-user-id' }
    }
  })

  beforeEach(() => {
    systemUnderTests = new CreateUserService(usersRepository, hashProvider, mailProvider)
  })

  it('should call find user with correct email', async () => {
    await systemUnderTests.execute(args)

    expect(usersRepository.findByEmail).toHaveBeenCalledTimes(1)
    expect(usersRepository.findByEmail).toBeCalledWith(args.userData.email)
  })

  it('should throws if user is already registered', async () => {
    usersRepository.findByEmail.mockResolvedValueOnce(makeFakeUser())

    const promise = systemUnderTests.execute(args)

    await expect(promise).rejects.toEqual(new AppError('Email já cadastrado'))
  })

  it('should generate a random password', async () => {
    // Number based on calc Math.floor(Math.random() * (max - min + 1) + min)
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.026063)

    await systemUnderTests.execute(args)

    expect(hashProvider.hash).toBeCalledTimes(1)
    expect(hashProvider.hash).toBeCalledWith('123456')
  })

  it('should save user with correct args', async () => {
    jest.spyOn(crypto, 'randomUUID').mockReturnValue('uuid')
    hashProvider.hash.mockResolvedValueOnce('hashed-password')

    await systemUnderTests.execute(args)

    const { systemParams, userData } = args
    const user = new User({
      createdBy: systemParams.userId,
      email: userData.email,
      name: userData.name,
      password: 'hashed-password',
      role: 'admin'
    })

    expect(usersRepository.save).toBeCalledTimes(1)
    expect(usersRepository.save).toBeCalledWith(user)
  })

  it('should return the created user with unhashed password', async () => {
    // Number based on calc Math.floor(Math.random() * (max - min + 1) + min)
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.026063)

    const user = makeFakeUser()
    usersRepository.save.mockResolvedValueOnce(user)

    const returnedUser = await systemUnderTests.execute(args)

    expect(returnedUser).toEqual({ ...user.toDto(), password: '123456' })
  })
})
