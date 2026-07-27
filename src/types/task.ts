export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string; // YYYY-MM-DD format
  createdAt: string; // ISO timestamp
}

export type TaskFilter = 'all' | 'active' | 'completed';
export type TaskSortBy = 'dueDate' | 'createdAt' | 'title';

export interface CreateTaskPayload {
  title: string;
  description?: string;
  dueDate?: string;
}
