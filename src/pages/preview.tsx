import { ClientEvents } from "@LyricSync/types"
import { useState, useEffect } from "react"
import { Socket, io } from "socket.io-client"

export default function Preview() {
  const [Socket, setSocket] = useState<Socket<ClientEvents> | null>()

  useEffect(() => {
    SocketInitializer()
  }, [])

  const SocketInitializer = () => {
    fetch('/api/socket')
    const socket = io()

    socket.on('connect', () => {
      console.log('connected', socket.id)
      setSocket(socket)

      socket.emit('RegisterClient', 'Preview')
    })
  }

  return (
    <div className="flex text-center items-center justify-center min-h-full">
      <h1 className="text-center m-auto font-bold text-wrap lg:text-9xl">

      </h1>
    </div>
  )
}