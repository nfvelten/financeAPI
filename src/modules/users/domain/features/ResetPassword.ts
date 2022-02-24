export interface ResetPassword {
  execute: (token: string, password: string) => Promise<void>
}
