import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { foods } from "@/constants/foods";
import { useFavorites } from "@/contexts/favorites-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

// Mock data for additional recipe details
const recipeDetails: Record<
  number,
  {
    servings: number;
    difficulty: string;
    chef: { name: string; title: string; avatar?: any };
    ingredients: string[];
    instructions: { step: number; icon: string; text: string }[];
  }
> = {
  1: {
    servings: 6,
    difficulty: "Medium",
    chef: { name: "Mia Rose", title: "Professional Chef" },
    ingredients: ["Salmon fillets", "Lemon", "Cloves", "Olive oil", "Garlic"],
    instructions: [
      { step: 1, icon: "🍶", text: "Mix olive oil, garlic, and lemon juice." },
      { step: 2, icon: "🥣", text: "Marinate salmon for 15 minutes." },
      { step: 3, icon: "🔥", text: "Grill salmon for 6-8 minutes per side." },
      { step: 4, icon: "🌿", text: "Garnish with fresh herbs and serve." },
    ],
  },
  2: {
    servings: 4,
    difficulty: "Easy",
    chef: { name: "Mia Rose", title: "Professional Chef" },
    ingredients: ["Chicken", "Pasta", "Spinach", "Sun-dried tomatoes"],
    instructions: [
      { step: 1, icon: "🍝", text: "Cook pasta according to package directions." },
      { step: 2, icon: "🍗", text: "Sauté chicken until golden brown." },
      { step: 3, icon: "🥛", text: "Add cream and simmer until thickened." },
      { step: 4, icon: "🍅", text: "Stir in spinach and sun-dried tomatoes." },
    ],
  },
};

// Default recipe details for recipes not in the mock data
const defaultRecipeDetails = {
  servings: 2,
  difficulty: "Medium",
  chef: { name: "Mia Rose", title: "Professional Chef" },
  ingredients: ["Main ingredient", "Seasoning", "Herbs"],
  instructions: [
    { step: 1, icon: "🍳", text: "Prepare the ingredients." },
    { step: 2, icon: "👨‍🍳", text: "Follow the recipe instructions." },
    { step: 3, icon: "🍽️", text: "Serve and enjoy!" },
  ],
};

const RecipeDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isFavorite, toggleFavorite } = useFavorites();

  const recipeId = id ? parseInt(id, 10) : null;
  const recipe = recipeId ? foods.find((f) => f.id === recipeId) : null;
  const details = recipeId && recipeDetails[recipeId]
    ? recipeDetails[recipeId]
    : defaultRecipeDetails;

  if (!recipe) {
    return (
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-center">
          <ThemedText className="text-xl">Recipe not found</ThemedText>
          <TouchableOpacity onPress={() => router.back()} className="mt-4">
            <ThemedText className="text-blue-500">Go Back</ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const isFav = isFavorite(recipe.id);

  return (
    <View className="flex-1 bg-black">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Full Screen Image */}
        <View className="relative h-96">
          <Image
            source={recipe.image}
            className="w-full h-full"
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.3)"]}
            className="absolute bottom-0 left-0 right-0 h-32"
          />

          {/* Header Navigation */}
          <SafeAreaView className="absolute top-0 left-0 right-0">
            <View className="flex flex-row justify-between items-center px-4 py-2">
              <TouchableOpacity
                onPress={() => router.back()}
                className="size-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm"
              >
                <MaterialIcons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleFavorite(recipe.id)}
                className="size-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm"
              >
                <MaterialIcons
                  name={isFav ? "favorite" : "favorite-outline"}
                  size={24}
                  color={isFav ? "#ef4444" : "white"}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>

        {/* Dark Overlay Card */}
        <View className="bg-gray-900 rounded-t-3xl -mt-8 pt-8 pb-8">
          {/* Recipe Title */}
          <View className="px-6 mb-4">
            <ThemedText className="text-4xl font-bold text-white mb-2">
              {recipe.title}
            </ThemedText>
            <ThemedText className="text-base text-gray-400 leading-6">
              {recipe.description}
            </ThemedText>
          </View>

          {/* Key Metrics */}
          <View className="flex flex-row justify-around px-6 mb-6">
            <View className="flex items-center">
              <MaterialIcons name="access-time" size={24} color="#f97316" />
              <ThemedText className="text-white mt-1 text-sm">
                {recipe.time} min
              </ThemedText>
            </View>
            <View className="flex items-center">
              <MaterialIcons name="people" size={24} color="#f97316" />
              <ThemedText className="text-white mt-1 text-sm">
                {details.servings} servings
              </ThemedText>
            </View>
            <View className="flex items-center">
              <MaterialIcons name="whatshot" size={24} color="#f97316" />
              <ThemedText className="text-white mt-1 text-sm">
                {details.difficulty}
              </ThemedText>
            </View>
          </View>

          {/* Chef Information */}
          <View className="px-6 mb-6">
            <View className="flex flex-row items-center justify-between bg-gray-800 rounded-2xl p-4">
              <View className="flex flex-row items-center gap-3">
                <View className="size-12 rounded-full bg-gray-700 items-center justify-center">
                  <MaterialIcons name="person" size={24} color="white" />
                </View>
                <View>
                  <ThemedText className="text-white font-semibold text-base">
                    {details.chef.name}
                  </ThemedText>
                  <ThemedText className="text-gray-400 text-sm">
                    {details.chef.title}
                  </ThemedText>
                </View>
              </View>
              <TouchableOpacity className="bg-white rounded-full px-6 py-2 flex flex-row items-center gap-2">
                <MaterialIcons name="add" size={20} color="black" />
                <ThemedText className="text-black font-semibold">Follow</ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Ingredient Tags */}
          <View className="px-6 mb-6">
            <ThemedText className="text-white font-semibold text-lg mb-3">
              Ingredients
            </ThemedText>
            <FlatList
              data={details.ingredients}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => `${item}-${index}`}
              contentContainerStyle={{ gap: 8 }}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  className={`rounded-full px-4 py-2 ${
                    index === 0
                      ? "bg-orange-500"
                      : "bg-gray-800 border border-gray-700"
                  }`}
                >
                  <ThemedText
                    className={`font-medium ${
                      index === 0 ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {item}
                  </ThemedText>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Instructions */}
          <View className="px-6">
            <ThemedText className="text-white font-semibold text-lg mb-4">
              Instructions
            </ThemedText>
            {details.instructions.map((instruction, index) => (
              <View
                key={index}
                className="flex flex-row items-start gap-4 mb-4 pb-4 border-b border-gray-800"
              >
                <View className="items-center">
                  <View className="size-10 rounded-full bg-orange-500 items-center justify-center">
                    <ThemedText className="text-white font-bold text-sm">
                      {String(instruction.step).padStart(2, "0")}
                    </ThemedText>
                  </View>
                  {index < details.instructions.length - 1 && (
                    <View className="w-0.5 h-full bg-gray-700 mt-2" />
                  )}
                </View>
                <View className="flex-1">
                  <View className="flex flex-row items-center gap-2 mb-2">
                    <ThemedText className="text-2xl">{instruction.icon}</ThemedText>
                  </View>
                  <ThemedText className="text-gray-300 text-base leading-6">
                    {instruction.text}
                  </ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default RecipeDetailScreen;

