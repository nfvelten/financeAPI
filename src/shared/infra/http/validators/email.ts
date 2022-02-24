import { Joi } from 'celebrate'

export const email = Joi.string().email()
