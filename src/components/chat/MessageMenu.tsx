import { Imessage, useMessage } from '@/lib/stores/useMessagesStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';

export default function MessageMenu  ({ message }: { message: Imessage }) {
  const setActionMessage = useMessage((state) => state.setActionMessage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            document.getElementById('trigger-edit')?.click();
            setActionMessage(message);
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            document.getElementById('trigger-delete')?.click();
            setActionMessage(message);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


