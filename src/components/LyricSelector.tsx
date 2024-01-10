import React, { KeyboardEvent, useEffect, useState, useRef } from "react";
import { Socket } from "socket.io-client";
import { schedule } from "@LyricSync/testData";
import { ClientEvents } from "@LyricSync/types";
import { trpc } from "@LyricSync/utils/trpc";
import { Song } from "@prisma/client";

interface LyricSelectorProps {
  Socket: Socket<ClientEvents>;
  currentSong: string;
}

export default function LyricSelector({ Socket, currentSong }: LyricSelectorProps) {
  const [currentButtonIndex, setCurrentButtonIndex] = useState(0);
  const lyricSelectorRef = useRef<HTMLDivElement>(null);
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
    // Auto-scroll to the current button whenever it changes
    if (lyricSelectorRef.current) {
      const buttonElement = lyricSelectorRef.current.querySelector(`#button-${currentButtonIndex - 1}`);
      if (buttonElement) {
        buttonElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [currentButtonIndex]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      const newButtonIndex =
        e.key === "ArrowDown"
          ? (currentButtonIndex + 1) % (schedule.find((v) => v.id === currentSong)?.lyrics.length! + 1 ?? 0)
          : (currentButtonIndex +
            (schedule.find((v) => v.id === currentSong)?.lyrics.length! + 1 ?? 0) -
            1) %
          (schedule.find((v) => v.id === currentSong)?.lyrics.length! + 1 ?? 0);
      setCurrentButtonIndex(newButtonIndex);
      sendLyric(currentSong, newButtonIndex - 1);
    }
  };

  function sendLyric(currentSong: string, index: number) {
    Socket.emit("sendLyric", currentSong, index);
  }

  function handleClick(i: number) {
    sendLyric(currentSong, i);
    setCurrentButtonIndex(i + 1);
  }

  return (
    <>
      <div
        ref={lyricSelectorRef}
        className="border-solid rounded flex flex-col border-secondary border-4 p-1 m-4 max-h-96 overflow-auto"
        onKeyDown={handleKeyDown}
        tabIndex={0} // Required for the div to receive keyboard events
      >
        {Song?.lyrics.map((v, i) => {
          if (v.length <= 0) return;
          return (
            <button
              onClick={() => {
                handleClick(i);
              }}
              key={`lyrics-${i}`}
              id={"button-" + i}
              className={`focus:outline-none text-left m-1 ${i + 1 === currentButtonIndex ? "bg-primary" : ""
                } p-1 rounded border-2 inline-block hover:bg-secondary`}
            >
              <span className="m-1 border-r-2 p-1">{i}</span>
              <span>{v}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
