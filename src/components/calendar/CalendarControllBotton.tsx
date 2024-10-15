'use client';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { add, sub } from 'date-fns';
import { Dispatch, SetStateAction } from 'react';

type CalendarControllProps = {
  mode: 'previous' | 'next';
  calendarDate: Date;
  setCalendarDate: Dispatch<SetStateAction<Date>>;
};

export default function CalendarControllBotton({ mode, calendarDate, setCalendarDate }: CalendarControllProps) {
  const handleControllCalendar = () => {
    if (mode === 'previous') {
      const updatedDate = sub(calendarDate, { months: 1 });
      setCalendarDate(updatedDate);
    } else {
      const updatedDate = add(calendarDate, { months: 1 });
      setCalendarDate(updatedDate);
    }
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
