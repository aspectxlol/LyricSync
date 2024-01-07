import { schedule } from "@LyricSync/testData"
import { ClientEvents, ServerEvents } from "@LyricSync/types"
import React from "react"
import { Socket } from "socket.io-client"

interface LyricSelectorProps {
  Socket: Socket<ClientEvents>
  currentSong: string
}

class LyricSelector extends React.Component<LyricSelectorProps> {
  Socket: Socket<ServerEvents, ClientEvents>
  currentSong: string

  constructor(props: LyricSelector) {
    super(props)
    this.currentSong = props.currentSong
    this.Socket = props.Socket
  }


  handleClick(i: number) {
    this.Socket?.emit('sendLyric', this.currentSong, i)
  }

  render(): React.ReactNode {
    return (
      <>
        <div className='border-solid rounded flex flex-col border-accent border-4 p-1 m-4 max-h-72 overflow-auto'>
          {
            schedule.find(v => v.id === this.currentSong)?.lyrics.map((v, i) => {
              if (v.length <= 0) return;
              return (
                <button
                  onClick={() => { this.handleClick(i) }}
                  key={`lyrics-${i}`}
                  id={"button-" + i}
                  className={
                    `focus:outline-none text-left m-1 focus:bg-primary p-1 border-sold rounded border-accent`}
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
}

export default LyricSelector