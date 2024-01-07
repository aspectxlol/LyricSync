import { schedule } from "@LyricSync/testData"
import { ClientEvents, ServerEvents, Song } from "@LyricSync/types"
import React, { KeyboardEvent, useEffect, useState } from "react"
import { Socket } from "socket.io-client"

interface LyricSelectorProps {
  Socket: Socket<ClientEvents>
  currentSong: string
}

export default function LyricSelector({ Socket, currentSong }: LyricSelectorProps) {
  const [currentButtonIndex, setCurrentButtonIndex] = useState(0)

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      const newButtonIndex = (e.key === "ArrowDown")
        ? (currentButtonIndex + 1) % (schedule.find(v => v.id === currentSong)?.lyrics.length ?? 0)
        : (currentButtonIndex - 1) % (schedule.find(v => v.id === currentSong)?.lyrics.length ?? 0);
      setCurrentButtonIndex(newButtonIndex);
      sendLyric(currentSong, newButtonIndex - 1)
    }
  };

  useEffect(() => {
    // console.log((schedule.find(v => v.id === currentSong)?.lyrics.length ?? 0), currentButtonIndex)

    console.log(currentButtonIndex - 1, schedule.find(v => v.id === currentSong)?.lyrics[currentButtonIndex - 1])
  }, [currentSong, currentButtonIndex])

  function sendLyric(currentSong: string, index: number) {
    Socket.emit('sendLyric', currentSong, index)
  }

  function handleClick(i: number) {
    sendLyric(currentSong, i)
    setCurrentButtonIndex(i + 1)
  }

  return (
    <>
      <div className='border-solid rounded flex flex-col border-accent border-4 p-1 m-4 max-h-72 overflow-auto' onKeyDown={handleKeyDown}>
        {
          schedule.find(v => v.id === currentSong)?.lyrics.map((v, i) => {
            if (v.length <= 0) return;
            return (
              <button
                onClick={() => { handleClick(i) }}
                key={`lyrics-${i}`}
                id={"button-" + i}
                className={
                  `focus:outline-none text-left m-1 ${(i + 1) === currentButtonIndex ? 'bg-primary' : ''} p-1 rounded border-2 inline-block`}
              >
                <span className="m-1 border-r-2 p-1">{i}</span>
                <span>{v}</span>
              </button>
            )
          }
          )
        }
      </div>
    </>
  )
}