'use client';

import { CalendarInitDataType } from '@/lib/type/scheduleTypes';
import { getDaysInMonth } from 'date-fns';
import { useFetchSchedules } from '@/queries/fetchSchedules';
import useScheduleStore from '@/lib/stores/useScheduleStore';
import { cn } from '@/lib/utils';
import { getFirstDayOfMonth, isSameDay } from '@/utils/calendar/calendarUtils';
import AddScheduleButton from '@/components/calendar/AddScheduleButton';
import CalendarControllBotton from '@/components/calendar/CalendarControllBotton';

const DAYS: string[] = ['일', '월', '화', '수', '목', '금', '토'];

// TODO: zustand에 userId 세팅 후에는 CalendarInitDataType으로만 prop type 지정
type TempClanedarInitType = CalendarInitDataType & {
  userId: string | undefined;
};

export default function Calendar({ artistId, userId }: TempClanedarInitType) {
  const { calendarDate, selectedDate, selectDate } = useScheduleStore((state) => state);
  const daysInMonth = getDaysInMonth(calendarDate);
  const firstDay = getFirstDayOfMonth(calendarDate);

  const { data: schedules, year, month } = useFetchSchedules(artistId, calendarDate);

  const handleToggleDate = (date: number) => {
    if (selectedDate === date) {
      selectDate(null);
    } else {
      selectDate(date);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <div className='grid grid-cols-5 w-full mb-8'>
        <div className='col-start-2 col-end-5 flex gap-3 justify-center items-center'>
          <CalendarControllBotton mode='previous' />
          <h2 className='text-center'>
            {year} . {month}
          </h2>
          <CalendarControllBotton mode='next' />
        </div>
        <AddScheduleButton
          artistId={artistId}
          userId={userId}
        />
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
              <div className='flex flex-col gap-1'>
                {schedules &&
                  schedules.map((schedule) => {
                    if (isSameDay(index + 1, schedule.date)) {
                      return (
                        <div
                          key={schedule.id}
                          className='bg-svt-rosequartz/50 rounded font-bold py-[5px] px-3 text-gray-700 leading-[12px] text-[12px]'
                        >
                          {schedule.title}
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
