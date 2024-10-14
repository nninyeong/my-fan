'use client';

import { CalendarInitDataType, Schedule } from '@/lib/type/scheduleTypes';
import { useFetchSchedules } from '@/queries/fetchSchedules';
import useScheduleStore from '@/lib/stores/useScheduleStore';
import { isSameDay } from '@/utils/calendar/calendarUtils';

export default function ScheduleList({ artistId, initialDate }: CalendarInitDataType) {
  let { data: schedules } = useFetchSchedules(artistId, initialDate);
  const { selectedDate } = useScheduleStore();

  if (selectedDate && schedules) {
    schedules = schedules.filter((schedule) => isSameDay(selectedDate, schedule.date));
  }

  return (
    <div className='border w-[300px] h-[600px] flex flex-col jusfity-start items-center gap-3 p-3'>
      {schedules &&
        schedules.map((schedule: Schedule) => (
          <div
            key={schedule.id}
            className='w-full h-[100px] border p-3'
          >
            <h5 className='font-bold'>{schedule.title}</h5>
            <p>{schedule.description}</p>
            <p>{schedule.date}</p>
          </div>
        ))}
    </div>
  );
}
