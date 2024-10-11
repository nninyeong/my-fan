'use client';

import { Schedule } from '@/lib/type/scheduleTypes';
import { getDay, getDaysInMonth, getMonth, startOfMonth } from 'date-fns';
import { useState } from 'react';

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

/**
 * 캘린더 날짜와 스케쥴의 날짜가 일치하는지 확인
 * @param calendarDate - 캘린더의 날짜 (date)
 * @param scheduleDate - 스케쥴의 날짜 ('2024-10-10')
 * @return 일치 여부
 */
const isSameDay = (calendarDate: number, scheduleDate: string): boolean => {
  return +scheduleDate.split('-')[2] === calendarDate;
};

type CalendarPropType = {
  initialDate: Date;
  initialSchedules: Schedule[];
  artistId: string;
};

export default function Calendar({ initialDate, initialSchedules, artistId }: CalendarPropType) {
  const [daysInMonth, setDaysInMonth] = useState<number>(getDaysInMonth(initialDate));
  const [firstDay, setFirstDay] = useState<number>(getFirstDayOfMonth(initialDate));
  const [month, setMonth] = useState<number>(getMonth(initialDate) + 1);
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);

  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <h2>{month}월</h2>
      <div className='grid grid-cols-7 w-full text-center'>
        {DAYS.map((day) => {
          return <div>{day}</div>;
        })}
      </div>
      <div className='grid grid-cols-7 auto-rows-[100px] w-full '>
        {Array.from({ length: firstDay }, () => (
          <div></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, index) => {
          return (
            <div className='flex flex-col gap-1 overflow-hidden border bg-white hover:cursor-pointer'>
              <div>{index + 1}</div>
              <div>
                {schedules.map((schedule) => {
                  if (isSameDay(index + 1, schedule.date)) {
                    return (
                      <div
                        key={schedule.id}
                        className='flex items-center gap-1 text-[12px]'
                      >
                        <div className='w-[5px] h-[5px] shrink-0 rounded-full bg-svt-rosequartz'></div>
                        <div className='overflow-hidden whitespace-nowrap truncate h-[12px] leading-[12px]'>
                          {schedule.title}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
