import { schedule } from "@LyricSync/testData"
import { ClientEvents } from "@LyricSync/types"
import { useState, useEffect } from "react"
import { Socket, io } from "socket.io-client"

export default function Dashboard() {
  const [Socket, setSocket] = useState<Socket<ClientEvents> | null>()
  const [currentSong, setCurrentSong] = useState('item1')

  useEffect(() => {
    SocketInitializer()
  }, [])

  const SocketInitializer = () => {
    fetch('/api/socket')
    const socket = io()

    socket.on('connect', () => {
      console.log('connected', socket.id)
      setSocket(socket)

      socket.emit('registerClient', 'control')
    })
  }

  function handleClick(i: number) {
    Socket?.emit('sendLyric', currentSong, i)
  }

  return (
    <>
      <div className='border-solid rounded flex flex-col border-black border-4 p-1 m-4 max-h-72 overflow-auto'>
        {
          schedule.find(v => v.id === currentSong)?.lyrics.map((v, i) => {
            if (v.length <= 0) return;
            return (
              <button
                onClick={() => { handleClick(i) }}
                key={`lyrics-${i}`}
                id={"button-" + i}
                className={
                  `hover:bg-gray-400 focus:outline-none text-left m-1 `}
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