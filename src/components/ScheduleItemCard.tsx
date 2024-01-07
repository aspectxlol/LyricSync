import { Song } from "@LyricSync/types";

interface ScheduleItemProps {
  item: ScheduleItem;
}

interface ScheduleItem extends Song {
  index: number
}

export default function ScheduleItemCard({
  item,
}: ScheduleItemProps) {
  return (
    <div className="cursor-pointer inline">
      <div data-rbdndraghandle>
        <span className="m-1 border-r-2 p-1">{item.index}</span>
        <span>{item.title}</span>
      </div>
    </div>
  );
}