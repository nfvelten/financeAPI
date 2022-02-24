*** /users ***
**POST /** - Create user
{
  name: string
  email: string
  password: string
  role: 'super'|'admin'|'editor'
  sendPasswordViaEmail: boolean
}

returns
{
  id: string
  name: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
  active: boolean
  email: string
  role: 'super'|'admin'|'editor'
  updatedBy?: string
  password?: string
}
