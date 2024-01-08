import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  timeParam: string;
}

const StaticCountdownTimer: React.FC<CountdownTimerProps> = ({ timeParam }) => {
  const [countdown, setCountdown] = useState<string>('');

  useEffect(() => {
    const timeArray = timeParam.split(':');
    const countdownDuration = (Number(timeArray[0]) * 60 * 60) + (Number(timeArray[1]) * 60) + Number(timeArray[2]);

    let remainingTime = countdownDuration;
    console.log(remainingTime)

    const interval = setInterval(() => {
      remainingTime -= 1;

      if (remainingTime <= 0) {
        clearInterval(interval);
        setCountdown('Expired')
      } else {
        const hours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = remainingTime % 60;

        if (hours > 0) {
          setCountdown(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setCountdown(`${minutes}m ${seconds}s`)
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeParam]);

  return (
    <div>
      <div>{countdown}</div>
    </div>
  );
};

export default StaticCountdownTimer;
