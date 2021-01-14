import express from 'express'
import path from 'path'

import { requestTime, logger } from './middleware.js'

const __dirname = path.resolve()

const app = express()
const PORT = process.env.PORT ?? 8080

app.listen(PORT, () => {
  console.log(`Server has been started on port ${ PORT }...`)
})


app.use(express.static(
  path.resolve(__dirname, 'static')
))
app.use(requestTime)
app.use(logger)
/*
app.get('/', (request, response) => {
  // response.send('<h1>Hello Express</h1>')
  response.sendFile(path.resolve(__dirname, 'static', 'index.html'))
})

app.get('/features', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'features.html'))
})
*/
app.get('/download', (req, res) => {
  res.download(path.resolve(__dirname, 'static', 'index.html'))
})
