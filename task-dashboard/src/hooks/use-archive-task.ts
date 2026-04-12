'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { Task } from '@/types/task';

export function useArchiveTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => apiClient.patch<Task>(`/tasks/${taskId}`, { status: 'archived' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}
