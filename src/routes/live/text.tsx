import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

export const Route = createFileRoute('/live/text')({
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
    <div className='flex flex-col justify-center items-center text-center'>
      <h1 className='text-5xl font-bold drop-shadow-[0_2.1px_1.2px_rgba(255,255,255,0.8)] text-white' dangerouslySetInnerHTML={{ __html: ActiveLyric }}></h1>
    </div>
  )
}