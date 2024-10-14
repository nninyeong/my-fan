'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Imessage, useMessage } from '@/lib/stores/useMessagesStore';
import browserClient from '@/utils/supabase/client';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import React, { useRef } from 'react';

export function DeleteAlert() {
  const actionMessage = useMessage((state) => state.actionMessage);
  const optimisticDeleteMessage = useMessage((state) => state.optimisticDeleteMessage);

  const handleDeleteMessage = async () => {
    const supabase = browserClient;
    optimisticDeleteMessage(actionMessage?.id!);
    const { error } = await supabase.from('messages').delete().eq('id', actionMessage?.id!);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('삭제 완료');
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className='sr-only'
          id='trigger-delete'
        ></button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>메세지를 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>메세지를 정말로 삭제하시겠습니까?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteMessage}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function EditAlert() {
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
