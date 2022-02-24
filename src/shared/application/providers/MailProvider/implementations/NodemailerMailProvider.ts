import nodemailer, { Transporter } from 'nodemailer'
import { IMailTemplateProvider } from '../../MailTemplateProvider'
import { IMailProvider, MailProviderDTO } from '../IMailProvider'
import smtpConfig from '../smtpConfig'

export class NodemailerMailProvider implements IMailProvider {
  private readonly transporter: Transporter

  constructor(
    private readonly mailTemplateProvider: IMailTemplateProvider
  ) {
    const transporter = nodemailer.createTransport({
      // host: smtpConfig.host,
      // port: smtpConfig.port,
      service: 'gmail',
      secure: false,
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.password
      }
    })

    this.transporter = transporter
  }

  public async sendMail({ to, from, subject, template }: MailProviderDTO.Input): Promise<void> {
    const html = await this.mailTemplateProvider.parse(template)
    await this.transporter.sendMail({
      from: {
        name: from?.name ?? 'Cap Financeira',
        address: from?.email ?? 'contato@capfinanceira.com.br'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html
    })

    console.log(`Mail sent to ${to.name} <${to.email}>`)
  }
}
