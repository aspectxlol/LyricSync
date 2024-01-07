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

  // const totalHeight = schedule.find((v) => v.id === currentSong)?.lyrics.length! * 53;
  // const focusedPosition = (currentLyric + 1) * 53;

  // const lyricContainerHeight = schedule.find((v) => v.id === currentSong)?.lyrics.length; // Adjust this value based on your design

  return (
    <div
      className="flex text-center items-center justify-center min-h-full overflow-hidden"
    >
      <div
        className="text-center m-auto font-bold text-wrap text-3xl transition-transform duration-500"
      >
        {schedule
          .find((v) => v.id === currentSong)
          ?.lyrics.map((v, i) => (
            <h1
              className={`${i === currentLyric
                ? 'text-text opacity-100 '
                : 'text-text opacity-50'
                }`}
              key={i}
            >
              {v}
            </h1>
          ))}
      </div>
    </div>
  );
}