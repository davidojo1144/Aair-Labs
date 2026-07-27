import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Task } from '@/src/types/task';

const TASKS_STORAGE_KEY = '@aairlabs_tasks_v1';

export const taskStorage = {
  async getTasks(): Promise<Task[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
      return jsonValue != null ? (JSON.parse(jsonValue) as Task[]) : [];
    } catch (error) {
      console.error('Error loading tasks from AsyncStorage:', error);
      return [];
    }
  },

  async saveTasks(tasks: Task[]): Promise<boolean> {
    try {
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, jsonValue);
      return true;
    } catch (error) {
      console.error('Error saving tasks to AsyncStorage:', error);
      return false;
    }
  },

  async clearTasks(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(TASKS_STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing tasks from AsyncStorage:', error);
      return false;
    }
  },
};
