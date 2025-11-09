import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { RecipeCard } from "@/components/recipe-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { categories } from "@/constants/categories";
import { foods } from "@/constants/foods";
import { useFavorites } from "@/contexts/favorites-context";
import { EvilIcons, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";

// import { TbBellRinging } from "react-icons/tb";

const HomeScreen = () => {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const filteredFoods = selectedCategory
    ? foods.filter((food) => food.category === selectedCategory)
    : foods;

  const handleSeeMore = () => {
    router.push({
      pathname: "/recipes",
      params: selectedCategory ? { category: selectedCategory } : {},
    });
  };

  const handleRecipePress = (foodId: number) => {
    router.push({
      pathname: "/recipe-detail",
      params: { id: foodId.toString() },
    });
  };
  return (
    <SafeAreaView className="px-2">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ThemedView>
          <View className="flex flex-row justify-between items-center py-4">
            <View className="flex flex-row items-center gap-2">
              <Image
                source={require("@/assets/images/person.jpg")}
                className={"rounded-full border size-10"}
              />
              <ThemedText> Hi Daniel 👋</ThemedText>
            </View>
            <View className="flex justify-center items-center bg-white/20 border border-gray-700 rounded-full p-3 h-14 w-14">
              <EvilIcons name="bell" size={25} color="white" />
            </View>
          </View>
          <View className="mt-4 mb-2">
            <ThemedText className="text-5xl">What's Cooking today?</ThemedText>
            {/* <Input /> */}
          </View>
          <View className="mt-6 px-2">
            <View className="flex flex-row items-center bg-gray-100 dark:bg-white/20 rounded-full px-4 py-3">
              <EvilIcons name="search" size={24} color="white" />
              <TextInput
                placeholder="Search your home..."
                placeholderTextColor="gray"
                className="flex-1 ml-3 text-base text-gray-900 dark:text-white"
              />
              <TouchableOpacity className="divide-x">
                <Ionicons
                  name="options-outline"
                  size={20}
                  color="white"
                  className="divide divide-x-white"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <View className="mt-8 flex flex-row justify-center items-center gap-2">
              <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ gap: 12 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    key={item.id}
                    className="flex flex-col gap-1 items-center"
                    onPress={() => {
                      setSelectedCategory(
                        selectedCategory === item.name ? null : item.name
                      );
                    }}
                  >
                    <View
                      className={`size-20 rounded-full flex justify-center items-center ${
                        selectedCategory === item.name
                          ? "bg-white/40 border-2 border-white"
                          : "bg-white/20 border border-gray-700"
                      }`}
                    >
                      <Image
                        source={item.image}
                        className={"rounded-full size-14"}
                      />
                    </View>
                    <Text className="text-center text-gray-500">
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            <View className="py-8 flex flex-row justify-between">
              <ThemedText className="text-2xl">
                Trending Recipes
              </ThemedText>
              <TouchableOpacity
                onPress={handleSeeMore}
                className="flex flex-row justify-center items-center"
              >
                <Text className="text-gray-500 text-lg">See More </Text>
                <MaterialIcons name="chevron-right" size={20} color="gray" />
              </TouchableOpacity>
            </View>

            {filteredFoods.slice(0, 15).map((item, index) => (
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
            ))}
          </View>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
