import nodemailer, { Transporter } from 'nodemailer'
import { IMailTemplateProvider } from '../../MailTemplateProvider'
import { IMailProvider, MailProviderDTO } from '../IMailProvider'

export class EtherealMailProvider implements IMailProvider {
  private transporter!: Transporter

  constructor(
    private readonly mailTemplateProvider: IMailTemplateProvider
  ) {
    nodemailer.createTestAccount((error, account) => {
      if (error) throw error

      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      })

      this.transporter = transporter
    })
  }

  public async sendMail({ to, from, subject, template }: MailProviderDTO.Input): Promise<void> {
    try {
      const message = await this.transporter.sendMail({
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

      console.log('Message sent: %s', message.messageId)
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
    } catch (e) {
      console.log('Ethereal Error')
      throw e
    }
  }
}
