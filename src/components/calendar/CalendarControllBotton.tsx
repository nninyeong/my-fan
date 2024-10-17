'use client';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { add, sub } from 'date-fns';
import useScheduleStore from '@/lib/stores/useScheduleStore';

type CalendarControllProps = {
  mode: 'previous' | 'next';
};

export default function CalendarControllBotton({ mode }: CalendarControllProps) {
  const { calendarDate, setCalendarDate, selectDate } = useScheduleStore((state) => state);

  const handleControllCalendar = () => {
    let updatedDate: Date;
    if (mode === 'previous') {
      updatedDate = sub(calendarDate, { months: 1 });
    } else {
      updatedDate = add(calendarDate, { months: 1 });
    }

    setCalendarDate(updatedDate);
    selectDate(null);
  };

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={handleControllCalendar}
    >
      {mode === 'previous' ? <ChevronLeft className='h-4 w-4' /> : <ChevronRight className='h-4 w-4' />}
    </Button>
  );
}
