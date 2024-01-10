import { schedule } from "@LyricSync/testData"
import { ClientEvents, ServerEvents } from "@LyricSync/types"
import { trpc } from "@LyricSync/utils/trpc"
import { Song } from "@prisma/client"
import { useState, useEffect } from "react"
import { Socket, io } from "socket.io-client"

export default function Preview() {
  const [Socket, setSocket] = useState<Socket<ServerEvents, ClientEvents> | null>()
  const [currentSong, setCurrentSong] = useState('')
  const [Song, setSong] = useState<Song>()
  const [currentLyric, setCurrentLyric] = useState(0)
  const [isClear, setClear] = useState(false)

  const data = trpc.song.get.useQuery({ id: currentSong })
  useEffect(() => {
    if (!data.error && data.data?.length) {
      const newSong = {
        ...data.data[0],
        createdAt: new Date(data.data[0].createdAt),
        updatedAt: new Date(data.data[0].updatedAt)
      };

      // Only update song if the new song is different from the current song
      if (JSON.stringify(newSong) !== JSON.stringify(Song)) {
        setSong(newSong);
      }
    }
  }, [data, Song]);

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

  Socket?.on('Clear', () => {
    setClear(!isClear)
  })

  return (
    <div className="flex text-center items-center justify-center min-h-full">
      <h1 className="text-center m-auto font-bold text-wrap text-5xl">
        {
          isClear ?
            <></>
            :
            Song?.lyrics[currentLyric]
        }
      </h1>
    </div>
  )
}