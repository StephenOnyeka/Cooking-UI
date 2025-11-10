import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { RecipeCard } from "@/components/recipe-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { foods } from "@/constants/foods";
import { useFavorites } from "@/contexts/favorites-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const FavoritesScreen = () => {
  const router = useRouter();
  const { getFavoriteFoods, isFavorite, toggleFavorite } = useFavorites();
  const [refreshing, setRefreshing] = useState(false);

  const handleRecipePress = (foodId: number) => {
    router.push({
      pathname: "/recipe-detail",
      params: { id: foodId.toString() },
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const favoriteFoods = getFavoriteFoods(foods);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ThemedView className="px-4 h-full">
          {/* Header */}
          <View className="flex flex-row items-center py-4">
            <ThemedText className="text-2xl font-medium">
              My Favorites
            </ThemedText>
          </View>

          {/* Favorites List */}
          <View className="mt-4">
            {favoriteFoods.length > 0 ? (
              favoriteFoods.map((item, index) => (
                <RecipeCard
                  key={item.id || index}
                  image={item.image}
                  title={`${item.title}\n${item.foodName}`}
                  time={`${item.time} mins`}
                  foodId={item.id}
                  isFavorite={isFavorite(item.id)}
                  onToggleFavorite={() => toggleFavorite(item.id)}
                  onPress={() => handleRecipePress(item.id)}
                />
              ))
            ) : (
              <View className="flex items-center justify-center py-20">
                <ThemedText className="text-xl text-gray-500">
                  No favorites yet. Start adding recipes to your favorites!
                </ThemedText>
              </View>
            )}
          </View>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default FavoritesScreen;

