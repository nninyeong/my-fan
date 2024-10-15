'use client';

import { CalendarInitDataType } from '@/lib/type/scheduleTypes';
import { getDaysInMonth } from 'date-fns';
import { useState } from 'react';
import { useFetchSchedules } from '@/queries/fetchSchedules';
import useScheduleStore from '@/lib/stores/useScheduleStore';
import { cn } from '@/lib/utils';
import { getFirstDayOfMonth, isSameDay } from '@/utils/calendar/calendarUtils';
import AddScheduleButton from '@/components/calendar/AddScheduleButton';

const DAYS: string[] = ['일', '월', '화', '수', '목', '금', '토'];

export default function Calendar({ initialDate, artistId }: CalendarInitDataType) {
  const [daysInMonth, setDaysInMonth] = useState<number>(getDaysInMonth(initialDate));
  const [firstDay, setFirstDay] = useState<number>(getFirstDayOfMonth(initialDate));

  const { data: schedules, year, month } = useFetchSchedules(artistId, initialDate);
  const { selectedDate, selectDate } = useScheduleStore();

  const handleToggleDate = (date: number) => {
    if (selectedDate === date) {
      selectDate(null);
    } else {
      selectDate(date);
    }
  };

  return (
    <div className='flex flex-col gap-3 justify-center items-center w-full'>
      <div className='grid grid-cols-3 w-full'>
        <h2 className='col-start-2 text-center'>
          {year} . {month}
        </h2>
        <AddScheduleButton artistId={artistId} />
      </div>
      <div className='grid grid-cols-7 w-full text-center'>
        {DAYS.map((day, index) => {
          return <div key={`${index}day`}>{day}</div>;
        })}
      </div>
      <div className='grid grid-cols-7 auto-rows-[100px] w-full '>
        {Array.from({ length: firstDay }, (_, index) => (
          <div key={`empty-${index}`}></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, index) => {
          return (
            <div
              key={`date-${index}`}
              className={cn(
                'flex flex-col gap-1 p-1 overflow-hidden bg-white hover:cursor-pointer',
                selectedDate === index + 1 && 'bg-gray-300',
              )}
              onClick={() => {
                handleToggleDate(index + 1);
              }}
            >
              <div>{index + 1}</div>
              <div>
                {schedules &&
                  schedules.map((schedule) => {
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
