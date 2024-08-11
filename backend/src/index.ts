import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import 'dotenv/config'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

app.use(bodyParser.json())
app.use(cors())

const httpServer = createServer(app)
const io = new Server(httpServer, { cors: { origin: ['*'] } })

io.on('connect', (socket) => {
  console.log(socket.id)
})

httpServer.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on Port ${process.env.PORT || 3000}`)
})