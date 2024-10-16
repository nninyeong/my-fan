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

// TODO: zustand userId 세팅 머지 후 artistId만 받아오기
export default function AddScheduleButton({ artistId, userId }: { artistId: string; userId: string | undefined }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  const initializeForm = () => {
    setTitle('');
    setDate(new Date());
    setDescription('');
    setContent('');
  };

  const [open, setOpen] = useState(false);

  const { mutate: mutateSchedule } = useMutateSchedule();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: 유효성검사 -> 아래 에러처리 다시

    if (!date || !userId) {
      alert('유저 정보가 없거나 날짜가 잘못되었습니다.');
      return;
    }

    mutateSchedule(
      {
        artist_id: artistId,
        title,
        date: format(date, 'yyyy-MM-dd'),
        content,
        description,
        user_id: userId,
      },
      {
        onSuccess: () => {
          initializeForm();
          setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
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
        <form onSubmit={handleSubmit}>
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
              <Input
                id='title'
                className='col-span-3'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
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
