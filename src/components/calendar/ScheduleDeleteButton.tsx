import { Pencil } from 'lucide-react';
import { Trash2 } from 'lucide-react';

export default function ScheduleDeleteButton({ scheduleId }: { scheduleId: string }) {
  return (
    <Trash2
      strokeWidth='1px'
      size='18px'
      className='hover:cursor-pointer'
    />
  );
}
