import { useState, useEffect } from "react";

const StaticCountdownTimer: React.FC<{ timeParam: number }> = ({ timeParam }) => {
  const [countdown, setCountdown] = useState<string>('');

  useEffect(() => {
    const countdownDuration = Number(timeParam);

    let remainingTime = countdownDuration;

    const interval = setInterval(() => {
      remainingTime -= 1;

      if (remainingTime <= 0) {
        clearInterval(interval);
        setCountdown('Expired')
      } else {
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime / 60));
        const seconds = Math.floor((remainingTime % (60)));

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