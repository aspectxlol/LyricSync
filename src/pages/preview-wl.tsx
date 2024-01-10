import LiveClock from "@LyricSync/components/LiveClock"
import { schedule } from "@LyricSync/testData"
import { ClientEvents, ServerEvents } from "@LyricSync/types"
import { trpc } from "@LyricSync/utils/trpc"
import { Song } from "@prisma/client"
import { useState, useEffect } from "react"
import { Socket, io } from "socket.io-client"

export default function Preview() {
  const [socket, setSocket] = useState<Socket<ServerEvents, ClientEvents> | null>();
  const [currentSong, setCurrentSong] = useState('');
  const [currentLyric, setCurrentLyric] = useState(0);
  const [isClear, setClear] = useState(false)
  const [Song, setSong] = useState<Song>()

  const data = trpc.song.get.useQuery({ id: currentSong })
  useEffect(() => {
    if (!data.error && data.data?.length) {
      const newSong = {
        ...data.data[0],
        createdAt: new Date(data.data[0].createdAt),
        updatedAt: new Date(data.data[0].updatedAt)
      };

      // Only update song if the new song is different from the current song
      if (JSON.stringify(newSong) !== JSON.stringify(Song)) {
        setSong(newSong);
      }
    }
  }, [data, Song]);

  useEffect(() => {
    SocketInitializer();
  }, []);

  useEffect(() => {
    if (currentSong && currentLyric !== undefined) {
      const lyricElement = document.getElementById(`lyric-${currentLyric}`);
      if (lyricElement) {
        lyricElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [currentLyric, currentSong]);

  const SocketInitializer = () => {
    fetch('/api/socket');
    const newSocket = io();

    newSocket.on('connect', () => {
      console.log('connected', newSocket.id);
      setSocket(newSocket);

      newSocket.emit('RegisterClient', 'Preview');
    });
  };

  socket?.on('Lyric', (songId: string, lyric: number) => {
    setCurrentSong(songId);
    setCurrentLyric(lyric);
  });

  socket?.on('Clear', () => {
    setClear(!isClear)
  })

  return (
    <div className="flex text-center items-center justify-center min-h-full overflow-hidden flex-col">
      <div className="text-center fixed top-1 left-auto bg-black text-white rounded-full">
        <LiveClock />
      </div>

      <div className="text-center m-auto font-bold text-wrap text-3xl transition-transform duration-500 mt-24">
        {Song?.lyrics.map((v, i) => (
          <h1
            id={`lyric-${i}`}
            className={`${i === currentLyric && isClear === false ? 'text-black opacity-100 ' : 'text-black opacity-50'}`}
            key={i}
          >
            {v}
          </h1>
        ))}
      </div>
    </div>
  );
}
