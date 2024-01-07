import { schedule } from "@LyricSync/testData"
import { ClientEvents } from "@LyricSync/types"
import { useState, useEffect } from "react"
import { Socket, io } from "socket.io-client"

export default function Preview() {
  const [Socket, setSocket] = useState<Socket<ClientEvents> | null>()
  const [currentSong, setCurrentSong] = useState('')
  const [currentLyric, setCurrentLyric] = useState(0)

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

  Socket?.on('Lyric', (songId: string, lyric: number) => {
    setCurrentSong(songId)
    setCurrentLyric(lyric)
  })

  return (
    <div className="flex text-center items-center justify-center min-h-full">
      <h1 className="text-center m-auto font-bold text-wrap lg:text-9xl">
        {schedule.find(v => v.id === currentSong)?.lyrics[currentLyric]}
      </h1>
    </div>
  )
}