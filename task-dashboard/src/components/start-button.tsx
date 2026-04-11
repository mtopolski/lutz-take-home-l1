'use client';

import { useStartTask } from '@/hooks/use-start-task';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { useState } from 'react';

interface StartButtonProps {
  taskId: string;
}

export function StartButton({ taskId }: StartButtonProps) {
  const { mutate, isPending } = useStartTask();
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
        className="px-2 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? 'Starting…' : 'Start'}
      </button>
      
      <ConfirmDialog
        open={isDialogOpen}
        onConfirm={handleConfirm}
        title="Start Task"
        description="Are you sure you want to start this task?"
        onOpenChange={(open) => setIsDialogOpen(open)}
        children={null}
      />
    </>
  );
}