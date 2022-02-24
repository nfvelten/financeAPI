import { MailTemplateProviderDTO } from '@shared/application/providers/MailTemplateProvider'

export interface IMailProvider {
  sendMail: (data: MailProviderDTO.Input) => Promise<void>
}

export namespace MailProviderDTO {
  type MailContact = {
    name: string
    email: string
  }

  export type Input = {
    to: MailContact
    from?: MailContact
    subject: string
    template: MailTemplateProviderDTO.Input
  }
}
