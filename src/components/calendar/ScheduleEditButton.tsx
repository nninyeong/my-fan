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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScheduleFormValues, scheduleSchema } from '@/utils/zod/scheduleSchema';

export default function ScheduleEditButton({ schedule }: { schedule: Schedule }) {
  const [date, setDate] = useState<Date | undefined>(new Date(schedule.date));
  const [open, setOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      title: schedule.title,
      description: schedule.description,
      date: new Date(schedule.date),
      content: schedule.content,
    },
  });

  const { mutate } = useUpdateSchedule();
  const handleEditSchedule = (data: ScheduleFormValues) => {
    if (!date) {
      alert('알맞은 date값이 아닙니다.');
      return;
    }

    const updateData = {
      scheduleId: schedule.id,
      title: data.title,
      date: format(data.date, 'yyyy-MM-dd'),
      content: data.content,
      description: data.description,
    };

    mutate(updateData, {
      onSuccess: () => {
        reset();
        setValue('date', new Date(schedule.date));
        setDate(new Date(schedule.date));
        setOpen(false);
      },
    });
  };

  const handleDialogClose = () => {
    reset();
    setValue('date', new Date(schedule.date));
    setDate(new Date(schedule.date));
    setOpen(!open);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleDialogClose}
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
        <form onSubmit={handleSubmit(handleEditSchedule)}>
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
              <div className='flex flex-col col-span-3'>
                <Input
                  id='title'
                  {...register('title')}
                />
                {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
              </div>
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
                onSelect={(date) => {
                  setDate(date);
                  setValue('date', date as Date);
                }}
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
              <div className='flex flex-col col-span-3'>
                <Input
                  id='description'
                  placeholder='장소, 시간 등 정보를 입력해주세요'
                  {...register('description')}
                />
                {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
              </div>
            </div>
            <div className='grid grid-cols-4 items-center gap-5'>
              <Label
                htmlFor='content'
                className='text-right font-bold text-[16px]'
              >
                상세 설명
              </Label>
              <div className='flex flex-col col-span-3'>
                <Input
                  id='content'
                  placeholder='자세한 설명을 입력해주세요'
                  {...register('content')}
                />
                {errors.content && <p className='text-red-500'>{errors.content.message}</p>}
              </div>
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
