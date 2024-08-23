import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

export const Route = createFileRoute('/live/')({
  component: () => <Live />
})

function Live() {
  const [isConnected, setIsConnected] = useState(false)
  const SocketRef = useRef<Socket>()

  const [ActiveLyric, setActiveLyric] = useState<string>('')

  useEffect(() => {
    if (!isConnected) SocketRef.current = io('localhost:3000/', { transports: ['websocket'] })
  }, [isConnected])
  
  useEffect(() => {
    if (!SocketRef.current) return;
    SocketRef.current.on('connect', () => {
      setIsConnected(true)
      SocketRef.current?.emit('join', 'Live', 'Stage')
    })
    
    return () => {
      if (SocketRef.current) {
        SocketRef.current.disconnect()
        SocketRef.current.removeAllListeners()
      }
    }
  }, [])

  SocketRef.current?.on('lyric', (songId, lyricId, content) => {
    setActiveLyric(content)
    console.log(content)
  })

  return (
    <div>
      <h1>{isConnected ? 'Connected' : 'Not connected'}</h1>
      <h1>Live</h1>
      <h1>{ActiveLyric}</h1>
    </div>
  )
}