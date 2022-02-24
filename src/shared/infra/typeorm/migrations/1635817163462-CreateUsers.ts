import { MigrationInterface, QueryRunner, Table } from 'typeorm'
export class CreateUsers1635817163462 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          { name: 'email', type: 'varchar', isUnique: true },
          { name: 'password', type: 'varchar' },
          { name: 'name', type: 'varchar' },
          { name: 'avatar', type: 'varchar', isNullable: true },
          { name: 'role', type: 'varchar' },
          { name: 'position', type: 'varchar' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'created_by', type: 'uuid' },
          { name: 'updated_at', type: 'timestamp', isNullable: true },
          { name: 'updated_by', type: 'uuid', isNullable: true },
          { name: 'deleted_at', type: 'timestamp', isNullable: true },
          { name: 'deleted_by', type: 'uuid', isNullable: true }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
