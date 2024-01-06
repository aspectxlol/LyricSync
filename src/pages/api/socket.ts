import { ClientEvents, NextApiResponseWithSocket } from "@LyricSync/types"
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
    const io = new Server<ClientEvents>(res.socket.server)
    
    io.on('connection', (socket: Socket) => {
      socket.on('registerClient', (clientType: string) => {
        socket.join(clientType)
      })
    })
    
    res.socket.server.io = io
  }
  res.end()
}

export default SocketHandler