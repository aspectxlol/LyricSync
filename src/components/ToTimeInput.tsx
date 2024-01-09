import React, { useRef } from 'react';
import toast from 'react-hot-toast';

export default function ToTimeInput() {
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);

  const handleCreateCountdown = () => {
    if (dateRef.current && timeRef.current) {
      const selectedDate = dateRef.current.value;
      const selectedTime = timeRef.current.value;

      const dateArray = selectedDate.split('-');
      const formattedDate = `${parseInt(dateArray[1]) - 1}/${dateArray[2]}/${dateArray[0]}`;
      const formattedTime = `${selectedTime}:00`;

      const url = `http://localhost:3000/timer?type=totime&date=${formattedDate}&time=${formattedTime}`;

      // Copy URL to clipboard
      navigator.clipboard.writeText(url)
        .then(() => {
          toast.success('Successfully Copied to Clipboard')
        })
        .catch((error) => {
          toast.error(`Failed to copy to clipboard`)
          console.log(error)
        });
    }
  };

  return (
    <div className="border-2 border-solid m-5 max-w-64 p-5 rounded-xl">
      <h1 className="text-center font-bold text-xl">Create Countdown</h1>
      <label className="block mb-2">Date:</label>
      <input type="date" ref={dateRef} className="border rounded-md p-2 mb-4 focus:outline-none bg-background" defaultValue={0} />
      <label className="block mb-2">Time:</label>
      <input type="time" ref={timeRef} className="border rounded-md p-2 mb-4 focus:outline-none bg-background" defaultValue={0} />
      <button
        onClick={handleCreateCountdown}
        className="m-2 inline-block border-2 p-2 rounded-lg"
      >
        Create Countdown
      </button>
    </div>
  );
}
