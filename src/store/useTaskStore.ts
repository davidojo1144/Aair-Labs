import { create } from 'zustand';
import type { Task, TaskFilter, TaskSortBy, CreateTaskPayload } from '@/src/types/task';
import { taskStorage } from '@/src/lib/taskStorage';
import { parseNaturalLanguageTasks } from '@/src/lib/taskParser';

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  searchQuery: string;
  filterStatus: TaskFilter;
  sortBy: TaskSortBy;
  isVoiceModalOpen: boolean;

  // Actions
  loadTasks: () => Promise<void>;
  addTask: (payload: CreateTaskPayload) => Promise<Task>;
  addMultipleTasks: (dictatedText: string) => Promise<Task[]>;
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  clearCompleted: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setFilterStatus: (filter: TaskFilter) => void;
  setSortBy: (sort: TaskSortBy) => void;
  setVoiceModalOpen: (open: boolean) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: true,
  searchQuery: '',
  filterStatus: 'all',
  sortBy: 'createdAt',
  isVoiceModalOpen: false,

  loadTasks: async () => {
    set({ isLoading: true });
    const tasks = await taskStorage.getTasks();
    set({ tasks, isLoading: false });
  },

  addTask: async (payload: CreateTaskPayload) => {
    const newTask: Task = {
      id: `task_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title: payload.title.trim(),
      description: payload.description?.trim() || undefined,
      dueDate: payload.dueDate || undefined,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const updatedTasks = [newTask, ...get().tasks];
    set({ tasks: updatedTasks });
    await taskStorage.saveTasks(updatedTasks);
    return newTask;
  },

  addMultipleTasks: async (dictatedText: string) => {
    const titles = parseNaturalLanguageTasks(dictatedText);
    if (titles.length === 0) return [];

    const now = new Date().toISOString();
    const newTasks: Task[] = titles.map((title, index) => ({
      id: `task_${Date.now()}_${index}_${Math.random().toString(36).substring(2, 5)}`,
      title,
      completed: false,
      createdAt: now,
    }));

    const updatedTasks = [...newTasks, ...get().tasks];
    set({ tasks: updatedTasks });
    await taskStorage.saveTasks(updatedTasks);
    return newTasks;
  },

  toggleTask: async (id: string) => {
    const updatedTasks = get().tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    set({ tasks: updatedTasks });
    await taskStorage.saveTasks(updatedTasks);
  },

  deleteTask: async (id: string) => {
    const updatedTasks = get().tasks.filter((task) => task.id !== id);
    set({ tasks: updatedTasks });
    await taskStorage.saveTasks(updatedTasks);
  },

  clearCompleted: async () => {
    const updatedTasks = get().tasks.filter((task) => !task.completed);
    set({ tasks: updatedTasks });
    await taskStorage.saveTasks(updatedTasks);
  },

  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setFilterStatus: (filter: TaskFilter) => set({ filterStatus: filter }),
  setSortBy: (sort: TaskSortBy) => set({ sortBy: sort }),
  setVoiceModalOpen: (open: boolean) => set({ isVoiceModalOpen: open }),
}));
