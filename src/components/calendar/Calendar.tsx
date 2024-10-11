'use client';

import { Schedule } from '@/lib/type/scheduleTypes';
import { getDay, getDaysInMonth, getMonth, startOfMonth } from 'date-fns';

const DAYS: string[] = ['일', '월', '화', '수', '목', '금', '토'];

/**
 * 입력한 날짜가 속한 달(month)이 어떤 요일에 시작하는지 반환
 * @param date - 시작 요일을 알고자하는 Date
 * @return 요일의 index (0: 일요일 ~ 6: 토요일)
 */
const getFirstDayOfMonth = (date: Date): number => {
  const startDate = startOfMonth(date);
  return getDay(startDate);
};

type CalendarPropType = {
  initialDate: Date;
  initialSchedules: Schedule[];
};

export default function Calendar({ initialDate, initialSchedules }: CalendarPropType) {
  const daysInMonth = getDaysInMonth(initialDate);
  const firstDay = getFirstDayOfMonth(initialDate);
  const month = getMonth(initialDate) + 1;

  return (
    <div className='flex flex-col justify-center items-center w-full border'>
      <h2>{month}월</h2>
      <div className='grid grid-cols-7 w-full text-center bg-pink-300'>
        {DAYS.map((day) => {
          return <div>{day}</div>;
        })}
      </div>
      <div className='grid grid-cols-7 auto-rows-[100px] w-full '>
        {Array.from({ length: firstDay }, () => (
          <div></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, index) => {
          return <div>{index + 1}</div>;
        })}
      </div>
    </div>
  );
}
