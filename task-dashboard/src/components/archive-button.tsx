'use client';

import { useArchiveTask } from '@/hooks/use-archive-task';

interface ArchiveButtonProps {
  taskId: string;
}

export function ArchiveButton({ taskId }: ArchiveButtonProps) {
  const { mutate, isPending } = useArchiveTask();

  return (
    <button
      onClick={() => mutate(taskId)}
      disabled={isPending}
      className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
    >
      {isPending ? 'Arcchiving…' : 'Archive'}
    </button>
  );
}
