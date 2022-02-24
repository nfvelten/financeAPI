export interface SendForgotPasswordEmail {
  execute: (email: string) => Promise<void>
}
