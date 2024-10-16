import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export default function useRequireSigninDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const showDialog = () => setOpen(true);

  const handleConfirm = () => {
    setOpen(false);
    router.push('/signIn');
  };

  const SignInDialog = () => {
    return (
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>로그인이 필요합니다</AlertDialogTitle>
            <AlertDialogDescription>
              이 기능을 사용하려면 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={handleConfirm}>확인</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  return { showDialog, SignInDialog };
}
