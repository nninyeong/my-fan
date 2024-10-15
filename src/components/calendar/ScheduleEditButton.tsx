import { Pencil } from 'lucide-react';
import { useUpdateSchedule } from '@/queries/fetchSchedules';
import { Schedule } from '@/lib/type/scheduleTypes';

export default function ScheduleEditButton({ schedule }: { schedule: Schedule }) {
  const { mutate } = useUpdateSchedule();
  const handleEditSchedule = () => {
    // TODO: { scheduleId, schedule 정보} 보내주기
  };

  return (
    <Pencil
      strokeWidth='1px'
      size='18px'
      className='hover:cursor-pointer'
      onClick={handleEditSchedule}
    />
  );
}
