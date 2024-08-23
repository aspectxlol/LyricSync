import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

export const Route = createFileRoute('/confidence')({
  component: () => <Confidence />
})

function Confidence() {
  const [isConnected, setIsConnected] = useState(false)
  const [ActiveSong, setActiveSong] = useState<number>(0)
  const [Lyrics, setLyrics] = useState<{id: number, content: string, songId: number}[]>([])
  const SocketRef = useRef<Socket>()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ActiveLyric, setActiveLyric] = useState<string>('')

  useEffect(() => {
    if (!isConnected) SocketRef.current = io('localhost:3000/', { transports: ['websocket'] })
  }, [isConnected])
  
  useEffect(() => {
    if (!SocketRef.current) return;
    SocketRef.current.on('connect', () => {
      setIsConnected(true)
      SocketRef.current?.emit('join', 'Live', 'COnfidence')
    })
    
    return () => {
      if (SocketRef.current) {
        SocketRef.current.disconnect()
        SocketRef.current.removeAllListeners()
      }
    }
  }, [])

  useEffect(() => {
    fetch(`http://localhost:3000/song/${ActiveSong}/lyrics`)
      .then(res => res.json())
      .then(data => {
        setLyrics(data)
      })
  }, [ActiveSong])
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  SocketRef.current?.on('lyric', (songId, lyricId, content) => {
    setActiveLyric(lyricId)
    setActiveSong(songId)
  })

  return (
    <div>
      <h1>{isConnected ? 'Connected' : 'Not connected'}</h1>
      <h1>Live</h1>
      {
        Lyrics.map(lyric => (
          <h1 key={lyric.id}>{lyric.content}</h1>
        ))
      }
    </div>
  )
}