import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateRetirementOrganizations1638463356930 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    await queryRunner.createTable(
      new Table({
        name: 'retirement_organizations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          { name: 'category_id', type: 'uuid' },
          { name: 'name', type: 'varchar', isUnique: true },
          { name: 'interest_per_month', type: 'decimal(12,9)' },
          { name: 'term_in_months', type: 'int' },
          { name: 'coefficient', type: 'decimal(12,9)' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' }
        ],
        foreignKeys: [
          new TableForeignKey({
            name: 'RetirementOrganizationCategory',
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'categories',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
          })
        ]
      }), true, true, true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('retirement_organizations')
  }
}
