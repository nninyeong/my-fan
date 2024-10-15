import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';

export default function AddScheduleButton({ artistId }: { artistId: string }) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Dialog>
      <div className='flex justify-end mr-5'>
        <DialogTrigger asChild>
          <Button className='w-[150px]'>스케줄 추가하기</Button>
        </DialogTrigger>
      </div>
      <DialogContent>
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
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
