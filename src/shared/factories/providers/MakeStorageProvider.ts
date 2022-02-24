import { IStorageProvider } from '@shared/application/providers/StorageProvider'
import { LocalStorageProvider } from '@shared/application/providers/StorageProvider/implementations/LocalStorageProvider'
import { SpacesStorageProvider } from '@shared/application/providers/StorageProvider/implementations/SpacesStorageProvider'
import env from '@config/env'

export class MakeStorageProvider {
  private static instance?: IStorageProvider

  static getInstance(): IStorageProvider {
    if (!this.instance) {
      switch (env.storage) {
        case 'spaces':
          this.instance = new SpacesStorageProvider()
          break
        default:
          this.instance = new LocalStorageProvider()
      }
    }

    return this.instance
  }
}
