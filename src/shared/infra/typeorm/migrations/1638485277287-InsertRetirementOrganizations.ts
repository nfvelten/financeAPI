import { MigrationInterface, QueryRunner } from 'typeorm'

export class InsertRetirementOrganizations1638485277287 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const categories = {
      federal: 'cd8252e8-c7a0-4302-b62f-8581eab1bf54',
      estadual: '0b700abe-dbcc-450d-b7e6-27adf2758d1d',
      municipal: '1eedd1c0-45ac-4f15-aa74-3f520945c560',
      inss: '2dc05254-4354-4bef-971b-9f01e30865e2'
    }

    const retirementOrganizations = [
      {
        id: '702b7fbb-a969-4894-a47a-0a1f57b5ec37',
        name: 'INSS',
        categoryId: categories.inss,
        coefficient: 0.02468837103,
        interestPerMonth: 1.15,
        termInMonths: 84,
        createdAt: '2021-12-03T17:02:22.877Z',
        updatedAt: '2021-12-03T17:02:22.877Z'
      },
      {
        id: '91629bc5-7b06-43b4-8758-1dc8e0c131d6',
        name: 'Governo do Brasil',
        categoryId: categories.federal,
        coefficient: 0.02531256447,
        interestPerMonth: 1.71,
        termInMonths: 96,
        createdAt: '2021-12-03T17:02:22.877Z',
        updatedAt: '2021-12-03T17:02:22.877Z'
      },
      {
        id: '268c67ca-69f4-4459-9c29-657c34501c55',
        name: 'Governo do Amazonas',
        categoryId: categories.estadual,
        coefficient: 0.03002714453,
        interestPerMonth: 1.8,
        termInMonths: 96,
        createdAt: '2021-12-03T17:02:22.877Z',
        updatedAt: '2021-12-03T17:02:22.877Z'
      },
      {
        id: '0dbcb789-612c-42e2-a75a-be7b8e802a25',
        name: 'Governo do Acre',
        categoryId: categories.estadual,
        coefficient: 0.02714860876,
        interestPerMonth: 1.7,
        termInMonths: 96,
        createdAt: '2021-12-03T17:02:22.877Z',
        updatedAt: '2021-12-03T17:02:22.877Z'
      },
      {
        id: 'd9f4fbb9-5a49-48ab-b993-761682fa82ce',
        name: 'Prefeitura de Manaus',
        categoryId: categories.municipal,
        coefficient: 0.0291335394,
        interestPerMonth: 1.89,
        termInMonths: 96,
        createdAt: '2021-12-03T17:02:22.877Z',
        updatedAt: '2021-12-03T17:02:22.877Z'
      },
      {
        id: '73f8a522-87a2-4e69-8453-f5df0810f38b',
        name: 'Manausprev',
        categoryId: categories.municipal,
        coefficient: 0.03225047005,
        interestPerMonth: 1.79,
        termInMonths: 84,
        createdAt: '2021-12-03T17:02:22.877Z',
        updatedAt: '2021-12-03T17:02:22.877Z'
      },
      {
        id: '240b56ce-8c9b-438b-8fd3-0eb604fcecc9',
        name: 'Prefeitura de Boa Vista',
        categoryId: categories.municipal,
        coefficient: 0.0278124661,
        interestPerMonth: 1.79,
        termInMonths: 96,
        createdAt: '2021-12-03T17:02:22.877Z',
        updatedAt: '2021-12-03T17:02:22.877Z'
      },
      {
        id: 'f3639f3f-a35d-4618-a1a6-f089884f7bc8',
        name: 'Prefeitura de Belém',
        categoryId: categories.municipal,
        coefficient: 0.02515444831,
        interestPerMonth: 1.79,
        termInMonths: 96,
        createdAt: '2021-12-01T21:13:25.139Z',
        updatedAt: '2021-12-01T21:13:25.139Z'
      }
    ]

    const queries = retirementOrganizations.map(
      ({ id, name, categoryId, coefficient, interestPerMonth, termInMonths, createdAt, updatedAt }) =>
    `insert into retirement_organizations values('${id}', '${categoryId}','${name}', ${interestPerMonth}, ${termInMonths}, ${coefficient},'${createdAt}','${updatedAt}');`
    )

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    queries.forEach(async query => {
      try {
        await queryRunner.query(query)
      } catch (e) {}
    })
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
