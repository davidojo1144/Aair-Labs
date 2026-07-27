import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import {
  Plus,
  Mic,
  Search,
  X,
  CheckCircle2,
  ListTodo,
  Sun,
  Moon,
  Trash2,
} from 'lucide-react-native';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { TaskItem } from '@/src/components/TaskItem';
import { VoiceInputModal } from '@/src/components/VoiceInputModal';
import { useTaskStore } from '@/src/store/useTaskStore';
import { useTheme } from '@/src/hooks/useTheme';
import type { TaskFilter } from '@/src/types/task';

export default function HomeScreen() {
  const router = useRouter();
  const { setTheme, isDark } = useTheme();

  const {
    tasks,
    searchQuery,
    filterStatus,
    isVoiceModalOpen,
    loadTasks,
    toggleTask,
    deleteTask,
    clearCompleted,
    setSearchQuery,
    setFilterStatus,
    setVoiceModalOpen,
  } = useTaskStore();

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleToggleTheme = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTheme(isDark ? 'light' : 'dark');
  };

  // Filter & Search tasks
  const filteredTasks = tasks.filter((task) => {
    // Filter status
    if (filterStatus === 'active' && task.completed) return false;
    if (filterStatus === 'completed' && !task.completed) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchDesc = task.description?.toLowerCase().includes(q) || false;
      return matchTitle || matchDesc;
    }

    return true;
  });

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <ScrollView className="flex-1 p-4" contentContainerStyle={{ paddingBottom: 110 }}>
        {/* App Header */}
        <View className="flex-row items-center justify-between mb-5 mt-2">
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-2xl bg-primary-600 items-center justify-center mr-3 shadow-sm">
              <ListTodo size={22} color="#ffffff" />
            </View>
            <View>
              <Text className="text-2xl font-extrabold text-secondary-900 dark:text-white">
                Task Master
              </Text>
              <Text className="text-xs text-secondary-500">
                {activeCount} active task{activeCount === 1 ? '' : 's'} • {completedCount} completed
              </Text>
            </View>
          </View>

          {/* Theme Toggle Button */}
          <TouchableOpacity
            onPress={handleToggleTheme}
            className="p-2.5 rounded-xl bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 shadow-sm"
          >
            {isDark ? <Sun size={20} color="#f59e0b" /> : <Moon size={20} color="#64748b" />}
          </TouchableOpacity>
        </View>

        {/* Search Input Bar */}
        <View className="relative mb-4 flex-row items-center">
          <View className="absolute left-3 z-10">
            <Search size={18} color="#94a3b8" />
          </View>
          <TextInput
            placeholder="Search tasks..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-secondary-200 bg-white text-base text-secondary-900 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white"
          />
          {searchQuery ? (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              className="absolute right-3 z-10 p-1"
            >
              <X size={16} color="#94a3b8" />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Status Filter Tabs */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row bg-secondary-100 dark:bg-secondary-800 p-1 rounded-xl flex-1 mr-2">
            {(['all', 'active', 'completed'] as TaskFilter[]).map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => {
                  Haptics.selectionAsync();
                  setFilterStatus(tab);
                }}
                className={`flex-1 py-1.5 rounded-lg items-center ${
                  filterStatus === tab
                    ? 'bg-white dark:bg-secondary-700 shadow-xs'
                    : 'bg-transparent'
                }`}
              >
                <Text
                  className={`text-xs font-semibold capitalize ${
                    filterStatus === tab
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-secondary-500'
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {completedCount > 0 && (
            <TouchableOpacity
              onPress={clearCompleted}
              className="px-2.5 py-2 rounded-xl bg-red-50 dark:bg-red-950/40 flex-row items-center"
            >
              <Trash2 size={14} color="#ef4444" />
              <Text className="ml-1 text-xs font-medium text-red-600 dark:text-red-400">Clear</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Task List Items or Empty State */}
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
          ))
        ) : (
          <Card className="items-center justify-center p-8 mt-4 border-dashed border-2 border-secondary-200 dark:border-secondary-700 bg-transparent">
            <CheckCircle2 size={48} color="#94a3b8" />
            <Text className="text-lg font-bold text-secondary-800 dark:text-white mt-3">
              {searchQuery
                ? 'No matching tasks found'
                : filterStatus === 'completed'
                  ? 'No completed tasks yet'
                  : 'No active tasks!'}
            </Text>
            <Text className="text-xs text-secondary-500 text-center mt-1 mb-5">
              {searchQuery
                ? 'Try searching for something else'
                : 'Tap the + button or use the Voice FAB to dictate your to-do list.'}
            </Text>

            {!searchQuery && (
              <Button
                title="Add Your First Task"
                variant="primary"
                size="sm"
                icon={<Plus size={16} color="#ffffff" />}
                onPress={() => router.push('/add-task')}
              />
            )}
          </Card>
        )}
      </ScrollView>

      {/* Floating Action Buttons (FABs) */}
      <View className="absolute bottom-6 right-6 flex-row items-center gap-3">
        {/* Voice Input FAB */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            setVoiceModalOpen(true);
          }}
          className="w-14 h-14 rounded-full bg-primary-500 items-center justify-center shadow-lg border-2 border-white dark:border-secondary-800"
        >
          <Mic size={24} color="#ffffff" />
        </TouchableOpacity>

        {/* Add Task FAB */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.push('/add-task');
          }}
          className="w-14 h-14 rounded-full bg-primary-700 items-center justify-center shadow-lg border-2 border-white dark:border-secondary-800"
        >
          <Plus size={28} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Voice Assistant Modal */}
      <VoiceInputModal visible={isVoiceModalOpen} onClose={() => setVoiceModalOpen(false)} />
    </SafeAreaView>
  );
}
