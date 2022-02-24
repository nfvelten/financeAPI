import nodemailer, { Transporter } from 'nodemailer'
import SES from 'aws-sdk/clients/ses'
import { IMailTemplateProvider } from '../../MailTemplateProvider'
import { IMailProvider, MailProviderDTO } from '../IMailProvider'
import env from '@config/env'

class SESMailProvider implements IMailProvider {
  private readonly client: Transporter

  constructor(
    private readonly mailTemplateProvider: IMailTemplateProvider
  ) {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: env.aws.region
      })
    })
  }

  async sendMail({ to, from, subject, template }: MailProviderDTO.Input): Promise<void> {
    await this.client.sendMail({
      from: {
        name: from?.name ?? 'Cap Financeira',
        address: from?.email ?? 'contato@capfinanceira.com.br'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(template)
    })
  }
}

export default SESMailProvider
