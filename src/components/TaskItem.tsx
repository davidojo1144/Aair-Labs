import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { CheckCircle2, Circle, Trash2, Calendar } from 'lucide-react-native';
import type { Task } from '@/src/types/task';
import { Card } from '@/src/components/ui/Card';
import { formatDate } from '@/src/lib/utils';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const handleToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle(task.id);
  };

  const handleDelete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    onDelete(task.id);
  };

  const isOverdue =
    task.dueDate &&
    !task.completed &&
    new Date(task.dueDate).getTime() < new Date().setHours(0, 0, 0, 0);

  return (
    <Card
      className={`mb-3 transition-all ${task.completed ? 'opacity-70 bg-secondary-50 dark:bg-secondary-900/40' : ''}`}
    >
      <View className="flex-row items-start justify-between">
        {/* Toggle Checkbox & Title/Desc */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleToggle}
          className="flex-1 flex-row items-start pr-3"
        >
          <View className="mt-0.5">
            {task.completed ? (
              <CheckCircle2 size={22} color="#10b981" />
            ) : (
              <Circle size={22} color="#64748b" />
            )}
          </View>

          <View className="ml-3 flex-1">
            <Text
              className={`text-base font-semibold ${
                task.completed
                  ? 'text-secondary-400 dark:text-secondary-500 line-through'
                  : 'text-secondary-900 dark:text-white'
              }`}
            >
              {task.title}
            </Text>

            {task.description ? (
              <Text
                numberOfLines={2}
                className={`mt-1 text-xs ${
                  task.completed
                    ? 'text-secondary-400 dark:text-secondary-600 line-through'
                    : 'text-secondary-500 dark:text-secondary-400'
                }`}
              >
                {task.description}
              </Text>
            ) : null}

            {task.dueDate ? (
              <View
                className={`mt-2.5 flex-row items-center self-start rounded-full px-2.5 py-0.5 ${
                  task.completed
                    ? 'bg-secondary-100 dark:bg-secondary-800'
                    : isOverdue
                      ? 'bg-red-100 dark:bg-red-950/60'
                      : 'bg-primary-50 dark:bg-primary-950/60'
                }`}
              >
                <Calendar
                  size={12}
                  color={task.completed ? '#64748b' : isOverdue ? '#ef4444' : '#0284c7'}
                />
                <Text
                  className={`ml-1 text-[11px] font-medium ${
                    task.completed
                      ? 'text-secondary-500'
                      : isOverdue
                        ? 'font-semibold text-red-600 dark:text-red-400'
                        : 'text-primary-600 dark:text-primary-400'
                  }`}
                >
                  {isOverdue && !task.completed ? 'Overdue: ' : 'Due: '}
                  {formatDate(task.dueDate)}
                </Text>
              </View>
            ) : null}
          </View>
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity
          onPress={handleDelete}
          className="p-1 rounded-lg active:bg-red-50 dark:active:bg-red-950/40"
        >
          <Trash2 size={18} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </Card>
  );
};
