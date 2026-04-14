'use client';

import { useStartTask } from '@/hooks/use-start-task';
import { useState } from 'react';

interface StartButtonProps {
  taskId: string;
}

export function StartButton({ taskId }: StartButtonProps) {
  const { mutate, isPending } = useStartTask();

  return (
    <>
      <button
        onClick={() => mutate(taskId)}
        disabled={isPending}
        className="px-2 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? 'Starting…' : 'Start'}
      </button>
    </>
  );
}