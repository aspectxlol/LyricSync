import express, { type Request, type Response } from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import 'dotenv/config'
import bodyParser from 'body-parser'
import cors from 'cors'

import SongRoute from './routes/Song'
import BackgroundRoute from './routes/Background'

const app = express()


const httpServer = createServer(app)
const io = new Server(httpServer, { cors: { origin: '*' } })

app.use(bodyParser.json())
app.use(cors())

app.use('/song', SongRoute)
app.use('/background', BackgroundRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

io.on('connection', (socket) => {
  socket.on('join', (room) => {
    socket.join(room)
  })

  socket.on('lyric', (id, content) => {
    console.log(id, socket.id, content)

    io.to('Live').emit('lyric', id, content)

  })

  socket.on('disconnect', () => {

  })
})

httpServer.listen(process.env.PORT || 3000, () => {
  console.clear()
  const startMessage = `
    \x1b[32m\x1b[1mLyricSync Backend Server v0.1.0\x1b[0m \x1b[90mReady

    \x1b[0m\x1b[32m-> \x1b[0mLocal: \x1b[36mhttp://localhost:${process.env.PORT || 3000}/
    \x1b[0m\x1b[32m-> \x1b[0m\x1b[90mPress \x1b[37mCTRL + C \x1b[90mto exit\x1b[0m
  `
  console.log(startMessage)
})