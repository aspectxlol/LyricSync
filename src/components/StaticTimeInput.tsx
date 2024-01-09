import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function StaticTimeInput() {
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const handleCreateCountdown = () => {
    const totalTimeInSeconds = parseInt(minutes) * 60 + parseInt(seconds);

    const url = `http://localhost:3000/timer?type=static&time=${totalTimeInSeconds}`;

    // Copy URL to clipboard
    navigator.clipboard.writeText(url)
      .then(() => {
        toast.success('Successfully Copied to Clipboard')
      })
      .catch((error) => {
        toast.error(`Failed to copy to clipboard`)
        console.log(error)
      });
  };

  return (
    <div className="border-2 border-solid m-5 max-w-64 p-5 rounded-xl">
      <h1 className="text-center font-bold text-xl">Create Countdown</h1>
      <label className="block mb-2">Minutes:</label>
      <input type="number" value={minutes} onChange={e => setMinutes(e.target.value)} className="border rounded-md p-2 mb-4 focus:outline-none bg-background" defaultValue={0} />
      <label className="block mb-2">Seconds:</label>
      <input type="number" value={seconds} onChange={e => setSeconds(e.target.value)} className="border rounded-md p-2 mb-4 focus:outline-none bg-background" defaultValue={0} />
      <button
        onClick={handleCreateCountdown}
        className="m-2 inline-block border-2 p-2 rounded-lg"
      >
        Create Countdown
      </button>
    </div>
  );
}