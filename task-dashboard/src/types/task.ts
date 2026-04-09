export type TaskStatus = 'not-started' | 'in-progress' | 'completed' | 'archived';

export type Task = {
  id: string;
  title: string;
  clientName: string;
  status: TaskStatus;
  dueDate: string;
};
