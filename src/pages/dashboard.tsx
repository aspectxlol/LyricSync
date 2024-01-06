import { ClientEvents } from "@LyricSync/types"
import { useState, useEffect } from "react"
import { Socket, io } from "socket.io-client"

export default function Dashboard() {
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

      socket.emit('registerClient', 'ctrl')
    })
  }

  return (
    <button></button>
  )
}