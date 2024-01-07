import { schedule } from "@LyricSync/testData"
import { ClientEvents, ServerEvents, Song } from "@LyricSync/types"
import React, { useEffect } from "react"
import { Socket } from "socket.io-client"

interface LyricSelectorProps {
  Socket: Socket<ClientEvents>
  currentSong: string
}

export default function LyricSelector({ Socket, currentSong }: LyricSelectorProps) {
  function handleClick(i: number) {
    Socket?.emit('sendLyric', currentSong, i)
  }

  return (
    <>
      <div className='border-solid rounded flex flex-col border-accent border-4 p-1 m-4 max-h-72 overflow-auto'>
        {
          schedule.find(v => v.id === currentSong)?.lyrics.map((v, i) => {
            if (v.length <= 0) return;
            return (
              <button
                onClick={() => { handleClick(i) }}
                key={`lyrics-${i}`}
                id={"button-" + i}
                className={
                  `focus:outline-none text-left m-1 focus:bg-primary p-1 border-sold rounded border-2`}
              >
                {v}
              </button>
            )
          }
          )
        }
      </div>
    </>
  )
}