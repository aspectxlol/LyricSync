import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { type Song } from '../types'
import { io, Socket } from 'socket.io-client'
import SongPicker from '../components/SongPicker'
// import Background from '../components/backgroundPicker'

export const Route = createFileRoute('/dashboard')({
  component: () => <Song />
})

function Song() {
  // const [songs, setSongs] = useState<Song[]>([])
  const [activeSong, setActiveSong] = useState<Song>()
  const [isConnected, setIsConnected] = useState(false)
  const SocketRef = useRef<Socket>()

  useEffect(() =>{
    if (!isConnected) SocketRef.current = io('localhost:3000/', { transports: ['websocket'] })
  }, [isConnected])

  useEffect(() => {
    if (!SocketRef.current) return;
    SocketRef.current.on('connect', () => {
      setIsConnected(true)
      SocketRef.current?.emit('join', 'Live', 'Dashboard')
    })
    
    return () => {
      if (SocketRef.current) {
        SocketRef.current.disconnect()
        SocketRef.current.removeAllListeners()
      }
    }
  }, [])

  return (
    <div className='p-5'>
      <SongPicker setActiveSong={setActiveSong} />
      <LyricPicker activeSong={activeSong} />
    </div>
  )
}

function LyricPicker({ activeSong }: { activeSong: Song | undefined}) {
  
  return (
    <div className='flex flex-col w-fit'>
      <h1 className='text-center text-3xl font-bold'>Lyrics</h1>
      {
        !activeSong ?
          <h1 className='w-64 p-2'>Select a song</h1> : 
          <div className='p-2'>
            {activeSong.lyrics.map((lyric, index) => (
              <div key={lyric.id} className='w-64 rounded-lg hover:shadow-2xl flex flex-row border-black border-2'>
                <div className='bg-red-500 w-6 min-h-5 rounded-l-lg text-center font-bold'>{index + 1}</div>
                <div className='p-2 w-full'>
                  <h2 className='font-bold'>{lyric.content}</h2>
                </div>
              </div>
            ))}
          </div>
      }
    </div>
  )

}