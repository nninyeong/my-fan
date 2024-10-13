import { Schedule } from '@/lib/type/scheduleTypes';

type ScheduleListPropType = {
  initialSchedules: Schedule[] | null;
};

export default function ScheduleList({ initialSchedules }: ScheduleListPropType) {
  return (
    <div className='border w-[300px] h-[600px] flex flex-col jusfity-start items-center gap-3 p-3'>
      {initialSchedules &&
        initialSchedules.map((schedule: Schedule) => (
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
