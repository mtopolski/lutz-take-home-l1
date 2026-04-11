'use client';

import { useArchiveTask } from '@/hooks/use-archive-task';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { useState } from 'react';

interface ArchiveButtonProps {
  taskId: string;
}

export function ArchiveButton({ taskId }: ArchiveButtonProps) {
  const { mutate, isPending } = useArchiveTask();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleConfirm = () => {
      mutate(taskId);
      closeDialog();
  };
  
  return (
    <>
    <button
        onClick={openDialog}
      disabled={isPending}
      className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
    >
      {isPending ? 'Arcchiving…' : 'Archive'}
    </button>
  );
}
