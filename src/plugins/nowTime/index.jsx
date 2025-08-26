import { useState, useEffect } from 'react';

export default function NowTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <div style={{ padding: 12 }}>{time.toLocaleTimeString()}</div>;
}
