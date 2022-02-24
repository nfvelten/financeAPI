export interface SoftDeleteUser {
  execute: (data: SoftDeleteUser.Input) => Promise<void>
}

export namespace SoftDeleteUser {
  export type Input = {
    loggedUserId: string
    id: string
  }
}
