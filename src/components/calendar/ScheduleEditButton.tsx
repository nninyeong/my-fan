import { Pencil } from 'lucide-react';

export default function ScheduleEditButton({ scheduleId }: { scheduleId: string }) {
  return (
    <Pencil
      strokeWidth='1px'
      size='18px'
      className='hover:cursor-pointer'
    />
  );
}
