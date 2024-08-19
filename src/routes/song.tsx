import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { type Song } from '../types'

export const Route = createFileRoute('/song')({
  component: () => <Song />
})

function Song() {
  const [songs, setSongs] = useState<Song[]>([])
  
  useEffect(() => {
    fetch('http://localhost:3000/song/all')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setSongs(data)
      })
  }, [])

  return (
    <div>
      <h1>Song</h1>
      {songs.map(song => (
        <div key={song.id}>
          <h2>{song.title}</h2>
          <p>{song.author}</p>
          {song.lyrics.map(lyric => (
            <p key={lyric.id}>{lyric.content}</p>
          ))}
        </div>
      ))}
    </div>
  )
}