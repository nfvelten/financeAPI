import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Simulations1637257982346 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    await queryRunner.createTable(
      new Table({
        name: 'simulations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          { name: 'email', type: 'varchar' },
          { name: 'phone', type: 'varchar' },
          { name: 'cpf', type: 'varchar' },
          { name: 'loan_type', type: 'varchar' },
          { name: 'status', type: 'varchar' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', isNullable: true },
          { name: 'updated_by', type: 'uuid', isNullable: true },
          { name: 'deleted_at', type: 'timestamp', isNullable: true },
          { name: 'deleted_by', type: 'uuid', isNullable: true }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contact')
  }
}
