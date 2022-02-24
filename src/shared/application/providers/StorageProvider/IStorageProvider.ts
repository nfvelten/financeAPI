export interface IStorageProvider {
  save: (data: StorageProviderDTO.Input) => Promise<string>
  delete: (data: StorageProviderDTO.Input) => Promise<void>
}

export namespace StorageProviderDTO {
  export type Input = {
    filename: string
    folder: string
  }
}
