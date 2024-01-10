"use client";

import ScheduleItemCard from '@LyricSync/components/ScheduleItemCard';
import { schedule } from '@LyricSync/testData';
import { trpc } from '@LyricSync/utils/trpc';
import { Song } from '@prisma/client';
import React, { useState, useCallback, MouseEvent, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface ScheduleProps {
  setCurrentSong: (Song: string) => void
  currentSong: string
}

export default function Schedule({ setCurrentSong, currentSong }: ScheduleProps) {
  const [Schedules, setSchedules] = useState<Song[]>([])

  const data = trpc.song.get.useQuery({})
  useEffect(() => {
    if (!data.error && data.data?.length) {
      const formattedData = data.data.map(song => ({
        ...song,
        createdAt: new Date(song.createdAt),
        updatedAt: new Date(song.updatedAt),
      }));

      // Only update schedules if the formatted data is different from the current schedules
      if (JSON.stringify(formattedData) !== JSON.stringify(Schedules)) {
        setSchedules(formattedData);
      }
    }
  }, [data, Schedules]);

  const handleDragEnd = useCallback((result: any) => {
    if (!result.destination) return;
    const newItems = reorder(Schedules, result.source.index, result.destination.index);
    setSchedules(newItems);
  }, [Schedules]);

  function handleClick(e: MouseEvent<HTMLDivElement>): any {
    const song = Schedules.find((v) => v.id === e.currentTarget.id);
    if (song) {
      setCurrentSong(song.id);
    } else {
      setCurrentSong(Schedules[0].id)
    }
  }

  return (
    <div className='border-solid rounded flex flex-col border-secondary border-4 p-1 m-4 max-h-full overflow-auto'>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="schedule">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {Schedules.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      id={item.id}
                      className={`m-2 rounded border-solid border-2 border-black p-2 ${item.id === currentSong ? 'bg-primary' : ''}`}
                      onClick={(e) => handleClick(e)}
                    >
                      <ScheduleItemCard
                        item={{ ...item, index }}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

// Helper function to reorder items in an array
function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}