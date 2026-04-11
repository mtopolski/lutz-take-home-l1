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
      className="text-sm font-medium text-green-700 hover:text-green-900 disabled:opacity-50"
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
