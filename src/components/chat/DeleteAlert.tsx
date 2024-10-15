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
import { useMessage } from '@/lib/stores/useMessagesStore';
import browserClient from '@/utils/supabase/client';
import { toast } from 'sonner';

export default function DeleteAlert() {
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
