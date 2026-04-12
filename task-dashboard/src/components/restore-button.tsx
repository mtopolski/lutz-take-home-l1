'use client';

import { useRestoreTask } from '@/hooks/use-restore-task';

interface RestoreButtonProps {
  taskId: string;
}

export function RestoreButton({ taskId }: RestoreButtonProps) {
  const { mutate, isPending } = useRestoreTask();

  return (
    <button
      onClick={() => mutate(taskId)}
      disabled={isPending}
      className="text-sm font-medium text-blue-700 hover:text-blue-900 disabled:opacity-50"
    >
      {isPending ? 'Restoring…' : 'Restore'}
    </button>
  );
}