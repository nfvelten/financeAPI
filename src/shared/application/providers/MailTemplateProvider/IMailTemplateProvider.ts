export interface IMailTemplateProvider {
  parse: (data: MailTemplateProviderDTO.Input) => Promise<string>
}

export namespace MailTemplateProviderDTO {
  type TemplateVariables = string | number | Record<string, unknown> | any[]

  export type Input = {
    file: string
    variables: Record<string, TemplateVariables>
  }
}
