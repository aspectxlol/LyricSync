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
    <div className="cursor-pointer">
      <div data-rbdndraghandle>
        <h3>{item.title}</h3>
      </div>
    </div>
  );
}