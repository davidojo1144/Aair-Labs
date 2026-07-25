import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import { Copy, RefreshCw, LogIn, Sparkles, CheckCircle2 } from 'lucide-react-native';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { LoadingSpinner } from '@/src/components/common/LoadingSpinner';
import { apiClient } from '@/src/services/api';
import { useAuthStore } from '@/src/store/useAuthStore';
import { showToast } from '@/src/components/ui/Toast';
import { Post } from '@/src/types';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function HomeScreen() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  const {
    data: posts,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery<Post[]>({
    queryKey: ['demo-posts'],
    queryFn: async () => {
      const response = await apiClient.get<Post[]>(
        'https://jsonplaceholder.typicode.com/posts?_limit=5',
      );
      return response.data;
    },
  });

  const handleCopy = async (text: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await Clipboard.setStringAsync(text);
    showToast.success('Copied to Clipboard', `"${text.substring(0, 20)}..." saved!`);
  };

  return (
    <ScrollView className="flex-1 bg-background-light dark:bg-background-dark p-4">
      {/* Banner / Welcome */}
      <Card className="mb-6 bg-gradient-to-r from-primary-600 to-primary-800 border-none">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <View className="flex-row items-center mb-1">
              <Sparkles color="#38bdf8" size={18} />
              <Text className="text-xs font-semibold text-primary-200 uppercase tracking-wider ml-1.5">
                Expo SDK 54 Stack
              </Text>
            </View>
            <Text className="text-2xl font-bold text-white">
              {isAuthenticated ? `Welcome back, ${user?.name}!` : 'Production Boilerplate'}
            </Text>
            <Text className="text-xs text-primary-100 mt-1">
              Expo Router • NativeWind v4 • Zustand • React Query
            </Text>
          </View>
        </View>

        {!isAuthenticated && (
          <Button
            title="Sign In / Register"
            variant="secondary"
            size="sm"
            className="mt-4 bg-white/20 active:bg-white/30"
            icon={<LogIn size={16} color="#ffffff" />}
            onPress={() => router.push('/(auth)/login')}
          />
        )}
      </Card>

      {/* Feature Showcase Grid */}
      <Text className="text-lg font-bold text-secondary-900 dark:text-white mb-3">
        Integrated Capabilities
      </Text>

      <View className="flex-row flex-wrap justify-between mb-6">
        <Card className="w-[48%] mb-3 p-4">
          <Text className="text-sm font-bold text-secondary-900 dark:text-white">expo-image</Text>
          <Image
            style={{ width: '100%', height: 90, borderRadius: 8, marginTop: 8 }}
            source="https://picsum.photos/seed/aairlabs/400/200"
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={300}
          />
        </Card>

        <Card className="w-[48%] mb-3 p-4 justify-between">
          <View>
            <Text className="text-sm font-bold text-secondary-900 dark:text-white">
              Device APIs
            </Text>
            <Text className="text-xs text-secondary-500 mt-1">
              Haptics, Clipboard, SecureStore, Local Auth
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => handleCopy('Aair Labs Expo SDK 54 Template')}
            className="mt-3 flex-row items-center justify-center p-2 rounded-lg bg-primary-50 dark:bg-primary-900/40"
          >
            <Copy size={14} color="#0284c7" />
            <Text className="text-xs font-semibold text-primary-600 dark:text-primary-400 ml-1.5">
              Copy Clip
            </Text>
          </TouchableOpacity>
        </Card>
      </View>

      {/* TanStack React Query Feed Section */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-bold text-secondary-900 dark:text-white">
          React Query Feed (Axios)
        </Text>
        <TouchableOpacity
          onPress={() => refetch()}
          disabled={isRefetching}
          className="flex-row items-center"
        >
          <RefreshCw size={14} color="#0284c7" />
          <Text className="text-xs font-medium text-primary-600 ml-1">
            {isRefetching ? 'Refreshing...' : 'Refresh'}
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <LoadingSpinner message="Fetching API posts..." />
      ) : (
        posts?.map((post) => (
          <Card key={post.id} className="mb-3">
            <View className="flex-row items-start">
              <CheckCircle2 size={18} color="#10b981" style={{ marginTop: 2 }} />
              <View className="flex-1 ml-2.5">
                <Text className="text-base font-semibold text-secondary-900 dark:text-white capitalize">
                  {post.title}
                </Text>
                <Text className="text-xs text-secondary-500 dark:text-secondary-400 mt-1 leading-relaxed">
                  {post.body}
                </Text>
              </View>
            </View>
          </Card>
        ))
      )}
    </ScrollView>
  );
}
