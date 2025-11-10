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
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RecipesScreen = () => {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category?: string }>();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [refreshing, setRefreshing] = useState(false);
  const colorScheme = useColorScheme();

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
  const iconColor = colorScheme === "dark" ? "white" : "black";
  const buttonBgColor =
    colorScheme === "dark" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.7)";

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ThemedView className="px-2">
          {/* Header */}
          <View className="gap-2 py-4">
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex flex-row  gap-2 items-center rounded-full backdrop-blur-sm"
              style={{ backgroundColor: buttonBgColor }}
            >
              <MaterialIcons name="chevron-left" size={24} color={iconColor} />
              <ThemedText className="text-2xl font-medium">
                {category ? `${category} Recipes` : "All Recipes"}
              </ThemedText>{" "}
            </TouchableOpacity>
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
