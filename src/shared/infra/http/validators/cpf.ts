import { Joi } from 'celebrate'

interface Helpers {
  message: (message: any) => any
}

const validator = (cpf: string, helpers: Helpers): string| object => {
  let soma
  let resto
  soma = 0
  let result: string| object = helpers.message('Invalid cpf')

  const blacklist = ['00000000000', '11111111111', '22222222222', '33333333333', '44444444444', '55555555555', '66666666666', '77777777777', '88888888888', '99999999999']

  if (cpf.length === 11) {
    if (!blacklist.includes(cpf)) {
      let i
      for (i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i)
      resto = (soma * 10) % 11

      if (resto === 10 ?? resto === 11) resto = 0
      if (!(resto !== parseInt(cpf.substring(9, 10)))) {
        soma = 0
        for (i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i)
        resto = (soma * 10) % 11

        if (resto === 10 ?? resto === 11) resto = 0
        if (!(resto !== parseInt(cpf.substring(10, 11)))) { result = cpf }
      }
    }
  }
  return result
}

export const cpf = Joi.string().length(11).custom(validator)
