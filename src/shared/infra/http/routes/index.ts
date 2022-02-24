import { Router } from 'express'

import auth from './auth.routes'
import retirementOrganization from './retirementOrganization.routes'
import loan from './loan.routes'
import users from './users'
import simulations from './simulations'
import categories from './categories.routes'

const routes = Router()

routes.use(auth.path, auth.route)
routes.use(simulations.path, simulations.route)
routes.use(users.path, users.route)
routes.use(retirementOrganization.path, retirementOrganization.router)
routes.use(loan.path, loan.router)
routes.use(categories.path, categories.router)

export default routes
