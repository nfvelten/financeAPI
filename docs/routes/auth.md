*** /sessions ***
**POST /** - Create a session
{
  email: string
  password: string
}

return:
{
  user: { id: string, name: string }
  token: string
}
