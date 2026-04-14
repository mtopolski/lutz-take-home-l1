'use client';

import { useCompleteTask } from '@/hooks/use-complete-task';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { useState } from 'react';

interface CompleteButtonProps {
  taskId: string;
}

export function CompleteButton({ taskId }: CompleteButtonProps) {
  const { mutate, isPending } = useCompleteTask();
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
        className="px-2 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 active:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? 'Completing…' : 'Complete'}
      </button>
      
      <ConfirmDialog
        open={isDialogOpen}
        onConfirm={handleConfirm}
        title="Complete Task"
        description="Are you sure you want to complete this task?"
        onOpenChange={(open) => setIsDialogOpen(open)}
        children={null}
      />
    </>
  );
}