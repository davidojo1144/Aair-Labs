import AsyncStorage from '@react-native-async-storage/async-storage';
import { taskStorage } from '../lib/taskStorage';
import type { Task } from '../types/task';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('taskStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return empty array if no tasks stored', async () => {
    (AsyncStorage.getItem as unknown as jest.Mock).mockResolvedValueOnce(null);
    const tasks = await taskStorage.getTasks();
    expect(tasks).toEqual([]);
  });

  it('should parse and return stored tasks', async () => {
    const mockTasks: Task[] = [
      { id: '1', title: 'Test Task', completed: false, createdAt: '2026-07-27' },
    ];
    (AsyncStorage.getItem as unknown as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockTasks));

    const tasks = await taskStorage.getTasks();
    expect(tasks).toEqual(mockTasks);
  });

  it('should save tasks to storage', async () => {
    const mockTasks: Task[] = [
      { id: '1', title: 'Test Task', completed: false, createdAt: '2026-07-27' },
    ];
    (AsyncStorage.setItem as unknown as jest.Mock).mockResolvedValueOnce(undefined);

    const success = await taskStorage.saveTasks(mockTasks);
    expect(success).toBe(true);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      '@aairlabs_tasks_v1',
      JSON.stringify(mockTasks),
    );
  });
});
