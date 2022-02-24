import { MigrationInterface, QueryRunner, TableUnique } from 'typeorm'

export class RemoveEmailIsUniqueConstraint1642788590851 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('users', 'UQ_97672ac88f789774dd47f7c8be3')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraint('users', new TableUnique({
      columnNames: ['name'],
      name: 'UQ_97672ac88f789774dd47f7c8be3'
    }))
  }
}
