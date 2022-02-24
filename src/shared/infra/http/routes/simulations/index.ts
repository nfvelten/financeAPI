import { Router } from 'express'

import { fgtsRoute } from './fgts'
import { payrollRoute } from './payroll'

const simulationRoute = Router()

simulationRoute.use('/fgts-birthday', fgtsRoute)
simulationRoute.use('/payroll-linked', payrollRoute)

export default { route: simulationRoute, path: '/simulations' }
