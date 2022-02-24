import { Connection, ConnectionOptions, createConnection, getConnectionOptions } from 'typeorm'
import Simulation from '@modules/simulations/infra/typeorm/models/Simulation'
import { RetirementOrganization, Category, FgtsBirthdayConfig } from '@modules/loan/infra/typeorm/models'
import { User } from '@modules/users/infra/typeorm/models/User'
import { UserToken } from '@modules/users/infra/typeorm/models'

export type ConnectDTO = {
  host?: string
  username?: string
  password?: string
  database?: string
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TypeormHelper {
  static connection?: Connection

  private static connectionName: string

  static async connect(props?: ConnectDTO): Promise<void> {
    if ((this.connection == null) ?? this.connection?.name !== this.connectionName) {
      const options = await this.getOptions()

      // remove migrations to prvent error on test
      // ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.
      this.connection = await createConnection(options)
    }
  }

  private static async getOptions(props?: ConnectDTO): Promise<ConnectionOptions> {
    const options = await getConnectionOptions()

    return Object.assign(options, props, {
      entities: [Category, FgtsBirthdayConfig, User, Simulation, RetirementOrganization, UserToken]
    })
  }

  static async disconnect(): Promise<void> {
    await this.connection?.close()
    this.connection = undefined
    this.connectionName = ''
  }

  static async query(query: string, params?: any[]): Promise<any> {
    try {
      return this.connection?.query(query, params)
    } catch (e) {
      console.log(query, params)
      throw e
    }
  }

  static getConnection(): Connection {
    if (this.connection == null) {
      throw new Error('Connection not found')
    }
    return this.connection
  }
}
