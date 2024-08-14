import express, { type Request, type Response } from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import 'dotenv/config'
import bodyParser from 'body-parser'
import cors from 'cors'

import SongRoute from './routes/Songs'
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
  console.log(socket.id)
})

httpServer.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on Port ${process.env.PORT || 3000}`)
})