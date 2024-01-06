import { NextApiRequest, NextApiResponse } from "next";
import type { Server as HTTPServer } from 'http'
import type { Socket as NetSocket } from 'net'
import { Server as IOServer, Socket } from 'socket.io'

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}

interface basicClient {
  clientId: string,
  type: string
}

interface ClientEvents {
  RegisterClient: (clientType: "Preview" | "Control" | "Admin")  => {}
}