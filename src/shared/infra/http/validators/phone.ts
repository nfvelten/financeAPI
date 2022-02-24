import { Joi } from 'celebrate'

interface Helpers {
  message: (message: any) => any
}

const validator = (phone: string, helpers: Helpers): string| object => {
  let result: string| object = phone

  if (phone.length < 10) result = helpers.message('`phone` precisa conter ddd')
  if (phone.length > 11) result = helpers.message('`phone` pode conter no maximo 11 caracteres')

  return result
}

export const phone = Joi.string().custom(validator)
