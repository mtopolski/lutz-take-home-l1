'use client';

import { useCompleteTask } from '@/hooks/use-complete-task';

interface CompleteButtonProps {
  taskId: string;
}

export function CompleteButton({ taskId }: CompleteButtonProps) {
  const { mutate, isPending } = useCompleteTask();

  return (
    <button
      onClick={() => mutate(taskId)}
      disabled={isPending}
      className="text-sm font-medium text-green-700 hover:text-green-900 disabled:opacity-50"
    >
      {isPending ? 'Completing…' : 'Complete'}
    </button>
  );
}
