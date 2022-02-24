*** /loans ***

Get installment amount

**GET /payroll-linked/simulation** - Buscar valor da parcela para uma determinada organizacao em emprestimo consignado
query: {
  retirementOrganizationId: string
  amount: string
}

return:
{
  installmentAmount: number
}

**GET /fgts-birthday/simulation** - Buscar valor da parcela para uma determinada organizacao em emprestimo consignado
query: {
  birthday: string
  accountBalance: string
}

return:
{
  installmentAmount: number
}
