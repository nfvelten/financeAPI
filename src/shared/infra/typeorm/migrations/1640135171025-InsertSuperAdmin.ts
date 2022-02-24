import { MigrationInterface, QueryRunner } from 'typeorm'

export class InsertSuperAdmin1640135171025 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const id = 'ce7893f1-5bd6-4a45-873a-23f5316ed58f'
    const email = 'cristiano@capfinanceira.com.br'
    // 123456
    const password = '$2a$08$zr9Ydpp0El1rY18oXxiUUO7zNyKvkqXlQrOcB9B.gQ9MWssnhgYiW'
    const name = 'Cristiano Sampaio'
    const query = `insert into users(id,email, password,name, role, position, created_by) values('${id}','${email}','${password}','${name}','super', 'CEO', '${id}')`
    await queryRunner.query(query)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
