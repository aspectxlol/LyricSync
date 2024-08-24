import { useState, useEffect } from "react"
import { Song } from "../types"

export default function SongPicker({ setActiveSong }: { setActiveSong: (song: Song) => void }) {
  const [songs, setSongs] = useState<Song[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/song/all')
      .then(res => res.json())
      .then(data => {
        setSongs(data)
      })
  }, [])

  return (
    <div className='flex flex-col w-fit'>
      <h1 className='text-center text-3xl font-bold'>Schedule</h1>
      <div>
        {songs.map(song => (
          <div key={song.id} className='p-2 bg-slate-400 w-64 rounded-lg m-2 hover:shadow-2xl hover:bg-slate-500' onClick={() => setActiveSong(song)}>
            <h2 className='font-bold'>{song.title}</h2>
            <div className='flex flex-row gap-4'>
              <p>{song.author}</p>
              <p>{song.lyrics.length} lyrics</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}