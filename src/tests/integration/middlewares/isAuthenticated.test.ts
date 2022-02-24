import express, { Express } from 'express'
import request from 'supertest'
import { errorHandler, isAuthenticated } from '@shared/infra/http/middlewares'

import jwt from 'jsonwebtoken'
import { PossibleRole } from '@modules/users/domain/entities/Role'

const sub = { id: 'any-id', role: 'editor', name: 'any-name', email: 'any-email' }
jest.mock('jsonwebtoken', () => ({
  verify (): object {
    return { sub: JSON.stringify(sub) }
  }
}))

const makeError = (message: string): object => ({
  status: 'error',
  message
})

function makeSub (role: PossibleRole): object {
  return { sub: JSON.stringify({ id: 'any-id', role, name: 'any-name', email: 'any-email' }) }
}

describe('isAuthenticated', () => {
  let server: Express

  beforeAll(() => {
    server = express()
    server.use(express.json())
    server.get('/auth-test', isAuthenticated(), (req, res) => res.json(req.user))
    server.get('/editor', isAuthenticated('editor'), (req, res) => res.json(req.user))
    server.get('/admin', isAuthenticated('admin'), (req, res) => res.json(req.user))
    server.get('/super', isAuthenticated('super'), (req, res) => res.json(req.user))
    server.use(errorHandler)
  })

  it('should throws if authorization header is not set', async () => {
    await request(server).get('/auth-test').expect(400, makeError('JWT is missing'))
  })

  it('should throws if verify throws', async () => {
    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => { throw new Error() })
    await request(server)
      .get('/auth-test')
      .set('Authorization', 'abc123')
      .expect(400, makeError('Invalid JWT'))
  })

  it('should set user in req.user', async () => {
    await request(server)
      .get('/auth-test')
      .set('Authorization', 'abc123')
      .expect(200, sub)
  })

  it('should allow editor, admin and super if role is editor', async () => {
    await request(server)
      .get('/editor')
      .set('Authorization', 'abc123')
      .expect(200)
  })

  it('should throws if role is editor and level is admin', async () => {
    await request(server)
      .get('/admin')
      .set('Authorization', 'abc123')
      .expect(401, makeError('You don\'t have permission to access this route'))
  })

  it('should allow admin and super if role is editor', async () => {
    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => makeSub('admin'))

    await request(server)
      .get('/editor')
      .set('Authorization', 'abc123')
      .expect(200)
  })

  it('should throws if role is admin and level is super', async () => {
    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => makeSub('admin'))

    await request(server)
      .get('/super')
      .set('Authorization', 'abc123')
      .expect(401, makeError('You don\'t have permission to access this route'))
  })

  it('should allow super if role is super', async () => {
    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => makeSub('super'))

    await request(server)
      .get('/super')
      .set('Authorization', 'abc123')
      .expect(200)
  })
})
