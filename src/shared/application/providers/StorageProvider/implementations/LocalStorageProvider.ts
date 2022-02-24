import fs from 'fs'
import { resolve } from 'path'

import uploadConfig from '@config/upload'

import { IStorageProvider } from '..'
import { StorageProviderDTO } from '../IStorageProvider'

export class LocalStorageProvider implements IStorageProvider {
  async save({ filename, folder }: StorageProviderDTO.Input): Promise<string> {
    const newFolder = resolve(uploadConfig.directory, folder)

    try {
      await fs.promises.stat(newFolder)
    } catch {
      await fs.promises.mkdir(newFolder, {
        recursive: true
      })
    }

    await fs.promises.rename(
      resolve(uploadConfig.directory, filename),
      resolve(newFolder, filename)
    )

    return filename
  }

  async delete({ filename, folder }: StorageProviderDTO.Input): Promise<void> {
    const filepath = resolve(uploadConfig.directory, folder, filename)

    try {
      await fs.promises.stat(filepath)
    } catch {
      return
    }

    await fs.promises.unlink(filepath)
  }
}
