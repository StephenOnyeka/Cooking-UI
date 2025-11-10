import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ThemedView className="px-2">
          {/* Header */}
          <View className="flex flex-row items-center py-4">
            <ThemedText className="text-2xl font-medium">
              Profile
            </ThemedText>
          </View>

          {/* Profile Content */}
          <View className="flex items-center justify-center py-20">
            <ThemedText className="text-xl text-gray-500">
              Profile content coming soon
            </ThemedText>
          </View>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ProfileScreen;

