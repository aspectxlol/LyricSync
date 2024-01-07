import LyricSelector from "@LyricSync/components/LyricSelector"
import Schedule from "@LyricSync/components/Schedule"
import { schedule } from "@LyricSync/testData"
import { ClientEvents, ServerEvents } from "@LyricSync/types"
import { useState, useEffect } from "react"
import { Socket, io } from "socket.io-client"

export default function Dashboard() {
  const [Socket, setSocket] = useState<Socket<ServerEvents, ClientEvents> | null>()
  const [currentSong, setCurrentSong] = useState('item5')

  useEffect(() => {
    SocketInitializer()
  }, [])

  const SocketInitializer = () => {
    fetch('/api/socket')
    const socket = io()

    socket.on('connect', () => {
      console.log('connected', socket.id)
      setSocket(socket)

      socket.emit('registerClient', 'control')
    })
  }


  return (
    <>
      <div className="grid grid-cols-2">
        <Schedule
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
        />
        <LyricSelector
          Socket={Socket!}
          currentSong={currentSong}
        />
      </div>
    </>
  )
}