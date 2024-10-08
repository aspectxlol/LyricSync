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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [bg, setBg] = useState<string>('http://localhost:3000/background/get/70c1699b-606a-4ea8-85c1-a54f3ac39f03.png')


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
    <div className='flex flex-col justify-center items-center w-full h-screen' style={{ backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h1 className='text-5xl font-bold drop-shadow-[0_2.1px_1.2px_rgba(255,255,255,0.8)] text-white' dangerouslySetInnerHTML={{ __html: ActiveLyric }}></h1>
    </div>
  )
}