import { useSuspenseQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { Task } from '@/types/task';

export function useGetTasks() {
  return useSuspenseQuery({
    queryKey: ['tasks'],
    queryFn: () => apiClient.get<Task[]>('/tasks'),
  });
}
