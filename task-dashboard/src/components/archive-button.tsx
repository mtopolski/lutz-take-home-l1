'use client';

import { useState } from 'react';
import { useArchiveTask } from '@/hooks/use-archive-task';
import { ConfirmDialog } from './ui/confirm-dialog';

interface ArchiveButtonProps {
  taskId: string;
}

export function ArchiveButton({ taskId }: ArchiveButtonProps) {
  const { mutate, isPending } = useArchiveTask();
  const [open, setOpen] = useState(false);

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={setOpen}
      title="Archive Task"
      description="Are you sure you want to archive this task?"
      confirmLabel="Archive"
      isLoading={isPending}
      onConfirm={() => { mutate(taskId); setOpen(false); }}
    >
      <button
        disabled={isPending}
        className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
      >
        {isPending ? 'Archiving…' : 'Archive'}
      </button>
    </ConfirmDialog>
  );
}