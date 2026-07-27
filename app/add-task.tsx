import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { ArrowLeft, Calendar, FileText, CheckCircle } from 'lucide-react-native';
import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { showToast } from '@/src/components/ui/Toast';
import { useTaskStore } from '@/src/store/useTaskStore';

export default function AddTaskScreen() {
  const router = useRouter();
  const addTask = useTaskStore((state) => state.addTask);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [errorTitle, setErrorTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      setErrorTitle('Task title is required');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorTitle('');
      await addTask({
        title: title.trim(),
        description: description.trim() || undefined,
        dueDate: dueDate.trim() || undefined,
      });

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      showToast.success('Task Added', `"${title.trim()}" created successfully!`);
      router.back();
    } catch {
      showToast.error('Error', 'Failed to save task.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark">
      <ScrollView className="flex-1 p-4">
        {/* Navigation Top Header */}
        <View className="flex-row items-center justify-between mb-6 mt-2">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center p-2 rounded-xl bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700"
          >
            <ArrowLeft size={20} color="#0284c7" />
            <Text className="ml-1 text-sm font-semibold text-primary-600 dark:text-primary-400">
              Back
            </Text>
          </TouchableOpacity>

          <Text className="text-xl font-bold text-secondary-900 dark:text-white">
            Create New Task
          </Text>
          <View className="w-16" />
        </View>

        <Card className="mb-6">
          {/* Title Input */}
          <Input
            label="Task Title *"
            placeholder="e.g., Complete project presentation"
            value={title}
            onChangeText={(val) => {
              setTitle(val);
              if (errorTitle) setErrorTitle('');
            }}
            error={errorTitle}
            leftIcon={<CheckCircle size={20} color="#64748b" />}
          />

          {/* Description Input */}
          <Input
            label="Description (Optional)"
            placeholder="Add extra details or instructions..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            leftIcon={<FileText size={20} color="#64748b" />}
          />

          {/* Due Date Input */}
          <Input
            label="Due Date (YYYY-MM-DD Optional)"
            placeholder="e.g., 2026-08-15"
            value={dueDate}
            onChangeText={setDueDate}
            leftIcon={<Calendar size={20} color="#64748b" />}
          />
        </Card>

        {/* Action Buttons */}
        <View className="flex-row gap-3 mb-8">
          <Button
            title="Cancel"
            variant="outline"
            className="flex-1"
            onPress={() => router.back()}
          />
          <Button
            title="Save Task"
            variant="primary"
            className="flex-1"
            isLoading={isSubmitting}
            onPress={handleSave}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
