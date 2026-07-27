import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Mic, MicOff, Sparkles, X, Check, Volume2 } from 'lucide-react-native';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { showToast } from '@/src/components/ui/Toast';
import { parseNaturalLanguageTasks } from '@/src/lib/taskParser';
import { useTaskStore } from '@/src/store/useTaskStore';

interface VoiceInputModalProps {
  visible: boolean;
  onClose: () => void;
}

const SAMPLE_DICTATIONS = [
  'Buy provisions and call mom',
  '1. Pick up dry cleaning 2. Pay electric bill 3. Schedule dentist appointment',
  'Prepare weekly status report, then email engineering team',
];

export const VoiceInputModal: React.FC<VoiceInputModalProps> = ({ visible, onClose }) => {
  const [dictationText, setDictationText] = useState('');
  const [isListening, setIsListening] = useState(true);
  const addMultipleTasks = useTaskStore((state) => state.addMultipleTasks);

  const parsedTasksPreview = parseNaturalLanguageTasks(dictationText);

  const handleToggleListening = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsListening((prev) => !prev);
  };

  const handleSelectSample = (sampleText: string) => {
    Haptics.selectionAsync();
    setDictationText(sampleText);
  };

  const handleSubmit = async () => {
    if (!dictationText.trim()) {
      showToast.error('Empty Dictation', 'Please speak or enter natural language tasks.');
      return;
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const addedTasks = await addMultipleTasks(dictationText);
    showToast.success(
      'Tasks Created via Voice',
      `Parsed & added ${addedTasks.length} task${addedTasks.length > 1 ? 's' : ''}!`,
    );

    setDictationText('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/60">
        <View className="rounded-t-3xl bg-white p-6 dark:bg-secondary-900 shadow-xl">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <View className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/50 items-center justify-center mr-2.5">
                <Sparkles size={20} color="#0284c7" />
              </View>
              <Text className="text-xl font-bold text-secondary-900 dark:text-white">
                Voice Task Assistant
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              className="p-1 rounded-full bg-secondary-100 dark:bg-secondary-800"
            >
              <X size={20} color="#64748b" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Pulsing Listening Indicator */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleToggleListening}
              className={`p-6 rounded-2xl items-center justify-center my-2 border ${
                isListening
                  ? 'bg-primary-50 border-primary-300 dark:bg-primary-950/40 dark:border-primary-700'
                  : 'bg-secondary-50 border-secondary-200 dark:bg-secondary-800 dark:border-secondary-700'
              }`}
            >
              <View
                className={`w-16 h-16 rounded-full items-center justify-center mb-3 ${
                  isListening ? 'bg-primary-600 animate-pulse' : 'bg-secondary-400'
                }`}
              >
                {isListening ? (
                  <Mic size={32} color="#ffffff" />
                ) : (
                  <MicOff size={32} color="#ffffff" />
                )}
              </View>
              <Text className="text-base font-bold text-secondary-900 dark:text-white">
                {isListening ? 'Listening...' : 'Dictation Paused'}
              </Text>
              <Text className="text-xs text-secondary-500 mt-1 text-center">
                {isListening
                  ? 'Speak naturally (e.g., "Buy provisions and call mom")'
                  : 'Tap microphone to resume voice input'}
              </Text>
            </TouchableOpacity>

            {/* Dictation Input Field */}
            <View className="mt-4">
              <Text className="text-xs font-semibold text-secondary-600 dark:text-secondary-400 mb-1.5 uppercase tracking-wider">
                Dictated Transcribed Speech
              </Text>
              <TextInput
                multiline
                numberOfLines={3}
                placeholder="Speak or type multiple tasks naturally..."
                placeholderTextColor="#94a3b8"
                value={dictationText}
                onChangeText={setDictationText}
                className="w-full p-4 rounded-xl border border-secondary-200 bg-white text-base font-normal text-secondary-900 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white min-h-[90px]"
              />
            </View>

            {/* Natural Language Sample Chips */}
            <View className="mt-4">
              <Text className="text-xs font-semibold text-secondary-500 mb-2">
                Try Sample Natural Language Dictations:
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {SAMPLE_DICTATIONS.map((sample, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => handleSelectSample(sample)}
                    className="px-3 py-1.5 rounded-lg bg-secondary-100 dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700"
                  >
                    <Text className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                      "{sample}"
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Realtime Smart Split Preview */}
            {parsedTasksPreview.length > 0 && (
              <Card className="mt-4 bg-primary-50/50 dark:bg-primary-950/20 border-primary-200 dark:border-primary-800">
                <View className="flex-row items-center mb-2">
                  <Volume2 size={16} color="#0284c7" />
                  <Text className="ml-1.5 text-xs font-bold text-primary-700 dark:text-primary-300">
                    Smart Multi-Task Parser Preview ({parsedTasksPreview.length} task
                    {parsedTasksPreview.length > 1 ? 's' : ''}):
                  </Text>
                </View>
                {parsedTasksPreview.map((item, index) => (
                  <View key={index} className="flex-row items-center py-1">
                    <Check size={14} color="#10b981" />
                    <Text className="ml-2 text-xs font-medium text-secondary-800 dark:text-secondary-200">
                      {index + 1}. {item}
                    </Text>
                  </View>
                ))}
              </Card>
            )}

            {/* Actions */}
            <View className="flex-row gap-3 mt-6 mb-2">
              <Button title="Cancel" variant="outline" className="flex-1" onPress={onClose} />
              <Button
                title={`Add ${parsedTasksPreview.length > 0 ? parsedTasksPreview.length : ''} Task${parsedTasksPreview.length > 1 ? 's' : ''}`}
                variant="primary"
                className="flex-1"
                disabled={!dictationText.trim()}
                onPress={handleSubmit}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
