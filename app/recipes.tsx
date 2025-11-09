import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { RecipeCard } from "@/components/recipe-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { foods } from "@/constants/foods";
import { useFavorites } from "@/contexts/favorites-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const RecipesScreen = () => {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category?: string }>();
  const { isFavorite, toggleFavorite } = useFavorites();
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

  const filteredFoods = category
    ? foods.filter((food) => food.category === category)
    : foods;

  return (
    <SafeAreaView className="px-2">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ThemedView>
          {/* Header */}
          <View className="flex flex-row items-center py-4">
            <TouchableOpacity
              onPress={() => router.back()}
              className="mr-4 flex justify-center items-center bg-white/20 border border-gray-700 rounded-full p-2 h-10 w-10"
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <ThemedText className="text-3xl font-semibold">
              {category ? `${category} Recipes` : "All Recipes"}
            </ThemedText>
          </View>

          {/* Recipes List */}
          <View className="mt-4">
            {filteredFoods.length > 0 ? (
              filteredFoods.map((item, index) => (
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
                  No recipes found
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

export default RecipesScreen;
