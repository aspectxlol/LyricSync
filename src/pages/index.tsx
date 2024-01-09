import StaticTimeInput from '@LyricSync/components/StaticTimeInput';
import ToTimeInput from '@LyricSync/components/ToTimeInput';
import React, { useRef, useState } from 'react';

export default function Home() {
  const [Type, setType] = useState<'To Time' | 'Static'>('To Time')
  return (
    <div>
      <div className='m-5'>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="To Time" className="sr-only peer" onClick={() => {
            if (Type === 'To Time') return setType('Static')
            else return setType('To Time')
          }} />
          <div className="w-11 h-6 bg-white peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-black peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-black after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-black peer-checked:bg-black"></div>
          <span className="ms-3 text-lg font-medium text-gray-900 dark:text-black">{Type}</span>
        </label>
      </div>
      {
        Type === 'To Time' ? <ToTimeInput /> : <StaticTimeInput />
      }
    </div>
  )
}
