import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import 'dotenv/config'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, { cors: { origin: ['*'] } })

io.on('connect', (socket) => {
  console.log(socket.id)
})

httpServer.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on Port ${process.env.PORT}`)
})

// const app = express()

// app.get('/', () => { })

// app.listen('3000', () => {
//   console.log('Listening on Port 3000')
// })