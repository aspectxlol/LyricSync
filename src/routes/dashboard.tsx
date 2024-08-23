import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { type Song } from '../types'
import { io, Socket } from 'socket.io-client'

export const Route = createFileRoute('/dashboard')({
  component: () => <Song />
})

function Song() {
  const [songs, setSongs] = useState<Song[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const SocketRef = useRef<Socket>()

  useEffect(() =>{
    if (!isConnected) SocketRef.current = io('localhost:3000/', { transports: ['websocket'] })
  }, [isConnected])

  useEffect(() => {
    fetch('http://localhost:3000/song/all')
      .then(res => res.json())
      .then(data => {
        setSongs(data)
      })
    
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
    <div>
      <h1>{isConnected ? 'Connected' : 'Not connected'}</h1>
      <h1>Song</h1>
      {SocketRef.current && 
      songs.map(song => (
        <div key={song.id}>
          <h2>{song.title}</h2>
          <p>{song.author}</p>
          {song.lyrics.map(lyric => (
            <div key={lyric.id} onClick={() => SocketRef.current?.emit('lyric', song.id,lyric.id, lyric.content)}>
              <p>{lyric.content}</p>
            </div>
          ))}
        </div>
      ))
      }
    </div>
  )
}