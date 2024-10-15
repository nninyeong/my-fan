'use client';

import { Trash2 } from 'lucide-react';
import { useDeleteSchedule } from '@/queries/fetchSchedules';

export default function ScheduleDeleteButton({ scheduleId }: { scheduleId: string }) {
  const { mutate } = useDeleteSchedule();
  const handleDeleteSchedule = () => {
    if (window.confirm('정말 스케줄을 삭제하시겠습니까?')) {
      mutate(scheduleId);
    }
  };

  return (
    <Trash2
      strokeWidth='1px'
      size='18px'
      className='hover:cursor-pointer'
      onClick={handleDeleteSchedule}
    />
  );
}
