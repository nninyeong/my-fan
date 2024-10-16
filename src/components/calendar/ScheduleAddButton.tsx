'use client';

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
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { useMutateSchedule } from '@/queries/fetchSchedules';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { ko } from 'date-fns/locale';
import { ScheduleFormValues, scheduleSchema } from '@/utils/zod/scheduleSchema';
import useRequireSigninDialog from '@/utils/useRequireSigninDialog';

export default function ScheduleAddButton({ artistId }: { artistId: string }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);

  const { user } = useAuthStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      title: '',
      description: '',
      date: new Date(),
      content: '',
    },
  });

  const { SignInDialog, showDialog } = useRequireSigninDialog();

  const { mutate: mutateSchedule } = useMutateSchedule();
  const onSubmit = (data: ScheduleFormValues) => {
    if (!user) {
      showDialog();
      return;
    }

    mutateSchedule(
      {
        artist_id: artistId,
        title: data.title,
        date: format(data.date, 'yyyy-MM-dd'),
        content: data.content || null,
        description: data.description,
        user_id: user.id,
      },
      {
        onSuccess: () => {
          reset();
          setValue('date', new Date());
          setDate(new Date());
          setOpen(false);
        },
      },
    );
  };

  const handleDialogClose = () => {
    reset();
    setValue('date', new Date());
    setDate(new Date());
    setOpen(!open);
  };

  return (
    <>
      <SignInDialog />
      <Dialog
        open={open}
        onOpenChange={handleDialogClose}
      >
        <div className='flex justify-end mr-5'>
          <DialogTrigger asChild>
            <Button
              className='w-[40px] h-[40px]'
              variant='default'
              size='icon'
            >
              <Plus strokeWidth='2px' />
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>스케줄 추가하기</DialogTitle>
              <DialogDescription>{artistId}의 스케줄을 공유해주세요!</DialogDescription>
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
                  selected={date}
                  onSelect={(date) => {
                    setDate(date);
                    setValue('date', date as Date);
                  }}
                  className='rounded-md'
                  locale={ko}
                />
                {errors.date && <p className='text-red-500'>{errors.date.message}</p>}
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
              <Button type='submit'>등록하기</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
