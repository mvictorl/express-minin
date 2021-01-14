import express from 'express'
import path from 'path'
import { requestTime, logger } from './middleware.js'

import serverRoutes from './routes/servers.js'

const __dirname = path.resolve()
const app = express()
const PORT = process.env.PORT ?? 8080

app.set('view engine', 'ejs')

app.listen(PORT, () => {
  console.log(`Server has been started on port ${ PORT }...`)
})

app.use(requestTime)
app.use(logger)
app.use(express.static(path.resolve(__dirname, 'static')))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(serverRoutes)

app.get('/', (req, res) => {
  res.render('index', { title: 'EJS Main Page', active: 'main' })
})

app.get('/features', (req, res) => {
  res.render('features', { title: 'EJS Features Page', active: 'features' })
})