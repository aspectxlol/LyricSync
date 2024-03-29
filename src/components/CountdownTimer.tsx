import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  dateParam: string;
  timeParam: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ dateParam, timeParam }) => {
  const [countdown, setCountdown] = useState<string>('');

  useEffect(() => {
    const dateArray = dateParam.split('/');
    const timeArray = timeParam.split(':');
    let countdownDate: number;

    countdownDate = new Date(
      Number(dateArray[2]),
      Number(dateArray[0]),
      Number(dateArray[1]),
      Number(timeArray[0]),
      Number(timeArray[1]),
      Number(timeArray[2])
    ).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      let distance = countdownDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setCountdown('EXPIRED');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (days > 0) {
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`)
      } else if (hours > 0) {
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setCountdown(`${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dateParam, timeParam]);

  return (
    <div>
      <div>{countdown}</div>
    </div>
  );
};

export default CountdownTimer;