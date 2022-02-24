import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddNegotiatorColumn1641914262635 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('simulations', new TableColumn({
      name: 'negotiator',
      isNullable: true,
      type: 'varchar'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
