import { Router } from 'express'
import { celebrate, Segments } from 'celebrate'
import { isAuthenticated } from '@shared/infra/http/middlewares'
import { FgtsSimulationController } from '@modules/simulations/application/controllers'
import { CreateSimulationService, ListSimulationService } from '@modules/simulations/application/services'
import { MakeSimulation } from '@shared/factories/repositories/MakeSimulations'
import { cpf, email, phone } from '../../validators'

const fgtsRoute = Router()
const repo = MakeSimulation.getInstance()
const createSimulation = new CreateSimulationService(repo)
const listSimulations = new ListSimulationService(repo)
const fgtsController = new FgtsSimulationController(listSimulations, createSimulation)

fgtsRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      cpf: cpf,
      email: email,
      phone: phone
    }
  }),
  async (req, res) => fgtsController.create(req, res)
)

fgtsRoute.get('/', isAuthenticated('editor'), async (req, res) => fgtsController.index(req, res))

fgtsRoute.patch('/loan-type', isAuthenticated('editor'), async (req, res) => fgtsController.update(req, res))

export { fgtsRoute }
