import CountdownTimer from '@LyricSync/components/CountdownTimer';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const MyPage = () => {
  const [type, setType] = useState<'totime' | 'static'>('totime');
  const [dateParam, setDateParam] = useState('0/8/2024');
  const [timeParam, setTimeParam] = useState('24:00:00');

  const router = useRouter();

  useEffect(() => {
    if (router.query.type === 'totime') {
      setType('totime');
      setDateParam((Array.isArray(router.query.date) ? router.query.date.join('') : router.query.date) || '0/8/2024');
      setTimeParam((Array.isArray(router.query.time) ? router.query.time.join('') : router.query.time) || '24:00:00');
    }
    if (router.query.type === 'static') {
      setType('static');
      setTimeParam((Array.isArray(router.query.time) ? router.query.time.join('') : router.query.time) || '0:05:00'); // default to 5 minutes if not provided
    }
  }, [router.query]);

  return (
    <div className='flex text-center items-center justify-center min-h-full m-auto font-bold text-wrap text-5xl'>
      {type === 'totime' && <CountdownTimer dateParam={dateParam} timeParam={timeParam} />}
    </div>
  );
};

export default MyPage;
