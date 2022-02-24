import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateFgtsBirthday1638882019710 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'config_fgts_birthday',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          { name: 'interest_per_month', type: 'decimal(12,9)' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' }
        ]
      }), true, true, true
    )

    const id = '11b3fab3-1461-42ee-87f5-f074dafc4f71'
    const interestPerMonth = 2.04
    await queryRunner.query(`insert into config_fgts_birthday values ('${id}', ${interestPerMonth}, '2021-12-07 15:18:21.702334', '2021-12-07 15:18:21.702334')`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('config_fgts_birthday')
  }
}
