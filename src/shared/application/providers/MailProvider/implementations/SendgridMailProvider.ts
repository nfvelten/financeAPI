import sendgrid from '@sendgrid/mail'
import { IMailProvider, MailProviderDTO } from '..'
import { IMailTemplateProvider } from '../../MailTemplateProvider'

// @injectable()
export default class SendgridMailProvider implements IMailProvider {
  constructor(
    // @inject('MailTemplateProvider')
    private readonly mailTemplateProvider: IMailTemplateProvider
  ) {
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY ?? '')
  }

  public async sendMail({ to, from, subject, template }: MailProviderDTO.Input): Promise<void> {
    sendgrid.send({
      to: to.email,
      from: from?.email ?? 'contato@capfinanceira.com.br',
      subject,
      html: await this.mailTemplateProvider.parse(template)
    })
  }
}
