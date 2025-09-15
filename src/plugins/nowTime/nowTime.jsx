import { useState, useEffect } from 'react';
import { TimeContainer } from './nowTime.style.js';
import { useTranslation } from 'react-i18next';
import { useStrings } from '/src/context/StringsContext.js';

export default function NowTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);


  const { t } = useTranslation('nowTime');
  const STRINGS = useStrings();

  return (
    <>
      {t(STRINGS.TIME_NOW_TITLE)}
      <TimeContainer>{time.toLocaleTimeString()}</TimeContainer>
    </>
  );
}
