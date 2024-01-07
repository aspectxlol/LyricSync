import LyricSelector from "@LyricSync/components/LyricSelector"
import Schedule from "@LyricSync/components/Schedule"
import { ClientEvents, ServerEvents } from "@LyricSync/types"
import { useState, useEffect } from "react"
import { Socket, io } from "socket.io-client"

export default function Dashboard() {
  const [Socket, setSocket] = useState<Socket<ServerEvents, ClientEvents> | null>()
  const [currentSong, setCurrentSong] = useState('item5')
  const [Clear, setClear] = useState(false)

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

  function HandleClear(status: boolean) {
    setClear(!Clear)
    Socket?.emit('sendClear')
  }

  return (
    <>
      <div className="top-1 m-2">
        <button
          className={`focus:outline-none hover:bg-secondary p-1 rounded border-2 ${Clear ? 'bg-primary' : ''}`}
          onClick={() => {
            HandleClear(Clear)
          }}
        >
          {Clear ? 'Cleared!' : 'Clear'}
        </button>
      </div >
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