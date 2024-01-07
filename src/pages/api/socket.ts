import { ClientEvents, NextApiResponseWithSocket, ServerEvents } from "@LyricSync/types"
import { NextApiRequest } from "next"
import { Socket, Server } from "socket.io"


const SocketHandler = (
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) => {
  if (res.socket.server.io) {
    res.send('ok')
  } else {
    console.log('Socket is initializing')
    const io = new Server<ClientEvents, ServerEvents>(res.socket.server)
    
    io.on('connection', (socket: Socket) => {
      socket.on('RegisterClient', (clientType: string) => {
        socket.join(clientType)
      })

      socket.on('sendLyric', (songId: string, lyric: number) => {
        io.to('Preview').emit('Lyric', songId, lyric)
      })
    })
    
    res.socket.server.io = io
  }
  res.end()
}

export default SocketHandler