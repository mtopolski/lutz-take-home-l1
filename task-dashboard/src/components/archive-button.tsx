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
        className="text-sm font-medium text-amber-700 hover:text-amber-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Archiving…' : 'Archive'}
      </button>
      
      <ConfirmDialog
        open={isDialogOpen}
        onConfirm={handleConfirm}
        title="Archive Task"
        description="Are you sure you want to archive this task?"
        onOpenChange={(open) => setIsDialogOpen(open)}
        children={null}
      />
    </>
  );
}