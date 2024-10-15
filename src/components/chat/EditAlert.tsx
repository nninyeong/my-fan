'use client';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMessage, Imessage } from '@/lib/stores/useMessagesStore';
import browserClient from '@/utils/supabase/client';
import { toast } from 'sonner';
import React, { useRef } from 'react';

export default function EditAlert() {
  const actionMessage = useMessage((state) => state.actionMessage);
  const optimisticUpdateMessage = useMessage((state) => state.optimisticUpdateMessage);
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleEdit = async () => {
    const supabase = browserClient;
    const text = inputRef.current.value.trim();

    if (text) {
      // NOTE - 메세지 업데이트
      optimisticUpdateMessage({
        ...actionMessage,
        text,
        is_edit: true,
      } as Imessage);

      const { error } = await supabase.from('messages').update({ text, is_edit: true }).eq('id', actionMessage?.id!);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('수정 완료');
      }
      document.getElementById('trigger-edit')?.click();
    } else {
      document.getElementById('trigger-edit')?.click();
      document.getElementById('trigger-delete')?.click();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className='sr-only'
          id='trigger-edit'
        ></button>
      </DialogTrigger>
      <DialogContent className='w-full'>
        <DialogHeader>
          <DialogTitle>글 수정하기</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <Input
            defaultValue={actionMessage?.text}
            ref={inputRef}
          />
        </div>
        <DialogFooter>
          <Button
            type='submit'
            onClick={handleEdit}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
