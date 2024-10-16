'use client';

import { Pencil } from 'lucide-react';
import { useUpdateSchedule } from '@/queries/fetchSchedules';
import { Schedule, ScheduleUpdate } from '@/lib/type/scheduleTypes';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function ScheduleEditButton({ schedule }: { schedule: Schedule }) {
  const [open, setOpen] = useState<boolean>(false);
  const { mutate } = useUpdateSchedule();
  const [value, setValue] = useState<ScheduleUpdate>({
    date: schedule.date,
    content: schedule.content,
    title: schedule.title,
    description: schedule.description,
  });

  const [date, setDate] = useState<Date | undefined>(new Date(schedule.date));

  const handleEditSchedule = () => {
    if (!date) {
      alert('알맞은 date값이 아닙니다.');
      return;
    }

    const updateData = { scheduleId: schedule.id, ...value, date: format(date, 'yyyy-MM-dd') };
    mutate(updateData, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <div className='flex justify-end mr-5'>
        <DialogTrigger asChild>
          <Pencil
            strokeWidth='1px'
            size='18px'
            className='hover:cursor-pointer'
          />
        </DialogTrigger>
      </div>
      <DialogContent>
        <form onSubmit={handleEditSchedule}>
          <DialogHeader>
            <DialogTitle>스케줄 추가하기</DialogTitle>
            <DialogDescription>{schedule.artist_id}의 스케줄을 공유해주세요!</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-5'>
              <Label
                htmlFor='title'
                className='text-right font-bold text-[16px]'
              >
                스케줄 이름 *
              </Label>
              <Input
                id='title'
                className='col-span-3'
                value={value.title}
                onChange={(e) => setValue({ ...value, title: e.target.value })}
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-5'>
              <Label
                htmlFor='date'
                className='text-right self-start pt-3 font-bold text-[16px]'
              >
                날짜 *
              </Label>
              <Calendar
                mode='single'
                locale={ko}
                selected={date}
                onSelect={setDate}
                className='rounded-md'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-5'>
              <Label
                htmlFor='description'
                className='text-right font-bold text-[16px]'
              >
                상세 정보 *
              </Label>
              <Input
                id='description'
                placeholder='장소, 시간 등 정보를 입력해주세요'
                className='col-span-3'
                value={value.description}
                onChange={(e) => setValue({ ...value, description: e.target.value })}
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-5'>
              <Label
                htmlFor='content'
                className='text-right font-bold text-[16px]'
              >
                상세 설명
              </Label>
              <Input
                id='content'
                placeholder='자세한 설명을 입력해주세요'
                className='col-span-3'
                value={value.content ?? ''}
                onChange={(e) => setValue({ ...value, content: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>수정하기</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
