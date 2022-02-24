import { Joi } from 'celebrate'

export const positiveNumber = Joi.number().positive().required()
