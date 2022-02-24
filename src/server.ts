import 'reflect-metadata'
import 'dotenv/config'
import { TypeormHelper } from '@modules/loan/infra/typeorm'

TypeormHelper.connect().then(async () => {
  const { app } = await import('./shared/infra/http/app')
  const port = process.env.PORT ?? 3333
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}).catch(console.log)
