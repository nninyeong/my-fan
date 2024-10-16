'use client';

import { CalendarInitDataType, Schedule } from '@/lib/type/scheduleTypes';
import { useFetchSchedules } from '@/queries/fetchSchedules';
import useScheduleStore from '@/lib/stores/useScheduleStore';
import { isSameDay } from '@/utils/calendar/calendarUtils';
import ScheduleDeleteButton from '@/components/calendar/ScheduleDeleteButton';
import ScheduleEditButton from '@/components/calendar/ScheduleEditButton';

// TODO: 유나님 zustand merge 후 zustand에서 받아오기
type TempCalendarInitialType = CalendarInitDataType & {
  userId: string | undefined;
};

export default function ScheduleList({ artistId, userId }: TempCalendarInitialType) {
  const { calendarDate, selectedDate } = useScheduleStore((state) => state);
  let { data: schedules } = useFetchSchedules(artistId, calendarDate);

  if (selectedDate && schedules) {
    schedules = schedules.filter((schedule) => isSameDay(selectedDate, schedule.date));
  }

  return (
    <div className='border w-[300px] h-[670px] overflow-auto flex flex-col jusfity-start items-center gap-3 p-3'>
      {schedules && schedules.length > 0 ? (
        schedules.map((schedule: Schedule) => (
          <div
            key={schedule.id}
            className='relative w-full border p-3'
          >
            {schedule.user_id === userId && (
              <div className='absolute right-3 bottom-3 flex'>
                <ScheduleEditButton schedule={schedule} />
                <ScheduleDeleteButton scheduleId={schedule.id} />
              </div>
            )}
            <h5 className='font-bold'>{schedule.title}</h5>
            <p>{schedule.description}</p>
            <p>{schedule.date}</p>
          </div>
        ))
      ) : (
        <div className='h-full flex flex-col justify-center'>
          <p>스케줄이 존재하지 않는 날입니다.</p>
        </div>
      )}
    </div>
  );
}
