/* eslint-disable eqeqeq */
import handlebars, { HelperOptions } from 'handlebars'
import fs from 'fs'
import { IMailTemplateProvider, MailTemplateProviderDTO } from './IMailTemplateProvider'

type Operator = '==' | '===' | '!=' | '!==' | '<' | '<=' | '>' | '>=' | '&&' | '??'

export class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ file, variables }: MailTemplateProviderDTO.Input): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8'
    })

    handlebars.registerHelper('ifCond', (leftSide, operator: Operator, rightSide, options: HelperOptions): unknown => {
      const operators = {
        '==': leftSide == rightSide ? options.fn(this) : options.inverse(this),
        '===': leftSide === rightSide ? options.fn(this) : options.inverse(this),
        '!=': leftSide != rightSide ? options.fn(this) : options.inverse(this),
        '!==': leftSide !== rightSide ? options.fn(this) : options.inverse(this),
        '<': leftSide < rightSide ? options.fn(this) : options.inverse(this),
        '<=': leftSide <= rightSide ? options.fn(this) : options.inverse(this),
        '>': leftSide > rightSide ? options.fn(this) : options.inverse(this),
        '>=': leftSide >= rightSide ? options.fn(this) : options.inverse(this),
        '&&': leftSide && rightSide ? options.fn(this) : options.inverse(this),
        '??': leftSide ?? rightSide ? options.fn(this) : options.inverse(this),
        default: options.inverse(this)
      }

      return operators[operator] ?? operators.default
    })

    const parseTemplate = handlebars.compile(templateFileContent)

    return parseTemplate(variables)
  }
}
