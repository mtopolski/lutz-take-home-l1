'use client';

import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { Task } from '@/types/task';

export function useArchiveTask() {
  return useMutation({
    mutationFn: (taskId: string) => apiClient.patch<Task>(`/tasks/${taskId}/archive`),
  });
}
