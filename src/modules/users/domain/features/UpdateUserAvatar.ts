export interface UpdateUserAvatar {
  execute: (data: UpdateUserAvatar.Input) => Promise<UpdateUserAvatar.Output>
}

export namespace UpdateUserAvatar {
  export type Input = {
    userId: string
    avatarFilename: string
  }

  export type Output = {
    avatarUrl: string
  }
}
