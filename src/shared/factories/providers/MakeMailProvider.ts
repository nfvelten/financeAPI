import { IMailProvider } from '@shared/application/providers/MailProvider/IMailProvider'
import { EtherealMailProvider } from '@shared/application/providers/MailProvider/implementations/EtherealMailProvider'
import SESMailProvider from '@shared/application/providers/MailProvider/implementations/SESMailProvider'
import { HandlebarsMailTemplateProvider } from '@shared/application/providers/MailTemplateProvider'
import env from '@config/env'
import SendgridMailProvider from '@shared/application/providers/MailProvider/implementations/SendgridMailProvider'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MakeMailProvider {
  private static instance?: IMailProvider

  static getInstance(): IMailProvider {
    if (!this.instance) {
      const mailTemplate = new HandlebarsMailTemplateProvider()

      switch (env.mailDriver) {
        case 'ses':
          this.instance = new SESMailProvider(mailTemplate)
          break
        case 'sendgrid':
          this.instance = new SendgridMailProvider(mailTemplate)
          break
        default:
          this.instance = new EtherealMailProvider(mailTemplate)
      }
    }

    return this.instance
  }
}
