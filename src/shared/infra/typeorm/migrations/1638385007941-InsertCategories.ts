/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationInterface, QueryRunner } from 'typeorm'

export class InsertCategories1638385007941 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const categories = [
      {
        id: 'cd8252e8-c7a0-4302-b62f-8581eab1bf54',
        name: 'Servidor público Federal',
        hasUniqueOrganization: true,
        created_at: '2021-12-01T20:13:25.139Z',
        updated_at: '2021-12-01T20:13:25.139Z'
      },
      {
        id: '0b700abe-dbcc-450d-b7e6-27adf2758d1d',
        name: 'Servidor público Estadual',
        hasUniqueOrganization: false,
        created_at: '2021-12-01T20:13:25.139Z',
        updated_at: '2021-12-01T20:13:25.139Z'
      },
      {
        id: '1eedd1c0-45ac-4f15-aa74-3f520945c560',
        name: 'Servidor público Municipal',
        hasUniqueOrganization: false,
        created_at: '2021-12-01T20:13:25.139Z',
        updated_at: '2021-12-01T20:13:25.139Z'
      },
      {
        id: '2dc05254-4354-4bef-971b-9f01e30865e2',
        name: 'Aposentados e pensionistas INSS',
        hasUniqueOrganization: true,
        created_at: '2021-12-01T20:13:25.139Z',
        updated_at: '2021-12-01T20:13:25.139Z'
      }
    ]

    const queries = categories.map(({ id, name, hasUniqueOrganization, created_at, updated_at }) =>
      `insert into categories values('${id}','${name}', ${hasUniqueOrganization ? 'TRUE' : 'FALSE'},'${created_at}','${updated_at}');`)

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    queries.forEach(async query => {
      try {
        await queryRunner.query(query)
      } catch (e) {}
    })
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
