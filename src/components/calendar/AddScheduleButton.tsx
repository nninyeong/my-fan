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
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// TODO: zustand userId 세팅 머지 후 artistId만 받아오기
export default function AddScheduleButton({ artistId, userId }: { artistId: string; userId: string | undefined }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);

  const scheduleSchema = z.object({
    title: z.string().min(1, { message: '스케줄 이름을 입력해주세요.' }),
    description: z.string().min(1, { message: '상세정보를 입력해주세요.' }),
    date: z
      .date({ invalid_type_error: '날짜는 Date 객체여야 합니다.' })
      .nullable()
      .refine((d) => d !== null, {
        message: '날짜는 필수 항목입니다.',
      }),
    content: z.string().optional(),
  });

  type ScheduleFormValues = z.infer<typeof scheduleSchema>;

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

  const { mutate: mutateSchedule } = useMutateSchedule();
  const onSubmit = (data: ScheduleFormValues) => {
    if (!userId) {
      // TODO: shadcn confirm dialog로 변경 -> 로그인 페이지로 이동?
      alert('잘못된 유저정보입니다. 다시 로그인해주세요.');
      return;
    }

    mutateSchedule(
      {
        artist_id: artistId,
        title: data.title,
        date: format(data.date, 'yyyy-MM-dd'),
        content: data.content || null,
        description: data.description,
        user_id: userId,
      },
      {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
      },
    );
  };

  const handleDialogClose = () => {
    reset();
    setOpen(!open);
  };

  return (
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
  );
}
