import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { foods } from "@/constants/foods";
import { useFavorites } from "@/contexts/favorites-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

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
      {
        step: 1,
        icon: "🍝",
        text: "Cook pasta according to package directions.",
      },
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
  const colorScheme = useColorScheme();

  const recipeId = id ? parseInt(id, 10) : null;
  const recipe = recipeId ? foods.find((f) => f.id === recipeId) : null;
  const details =
    recipeId && recipeDetails[recipeId]
      ? recipeDetails[recipeId]
      : defaultRecipeDetails;

  if (!recipe) {
    return (
      <ThemedView className="flex-1">
        <SafeAreaView className="flex-1">
          <View className="flex-1 items-center justify-center">
            <ThemedText className="text-xl">Recipe not found</ThemedText>
            <TouchableOpacity onPress={() => router.back()} className="mt-4">
              <ThemedText className="text-blue-500">Go Back</ThemedText>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ThemedView>
    );
  }

  const isDark = colorScheme === "dark";
  const isFav = isFavorite(recipe.id);
  const iconColor = colorScheme === "dark" ? "white" : "black";
  const buttonBgColor =
    colorScheme === "dark" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.7)";

  return (
    <ThemedView className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Full Screen Image */}
        <View className="relative h-96">
          <Image
            source={recipe.image}
            className="w-full h-full"
            resizeMode="cover"
          />
          <LinearGradient
            colors={
              colorScheme === "dark"
                ? ["transparent", "rgba(0,0,0,0.3)"]
                : ["transparent", "rgba(255,255,255,0.3)"]
            }
            className="absolute bottom-0 left-0 right-0 h-32"
          />

          {/* Header Navigation */}
          <SafeAreaView className="absolute top-0 left-0 right-0">
            <View className="flex flex-row justify-between items-center px-4 py-2">
              <TouchableOpacity
                onPress={() => router.back()}
                className="size-14 items-center justify-center rounded-full backdrop-blur-sm"
                style={{ backgroundColor: buttonBgColor }}
              >
                <MaterialIcons name="chevron-left" size={24} color={iconColor} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleFavorite(recipe.id)}
                className="size-14 items-center justify-center rounded-full backdrop-blur-sm"
                style={{ backgroundColor: buttonBgColor }}
              >
                <MaterialIcons
                  name={isFav ? "favorite" : "favorite-outline"}
                  size={24}
                  color={isFav ? "#f97316" : iconColor}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>

        {/* Dark Overlay Card */}
        <ThemedView className="bg-white dark:bg-gray-900 rounded-t-3xl -mt-8 pt-8 pb-8">
          {/* Recipe Title */}
          <View className="px-6 mb-4">
            <ThemedText
              className="text-4xl mb-4"
              lightColor="#11181C"
              darkColor="#ECEDEE"
            >
              {recipe.title}
            </ThemedText>
            <ThemedText
              className="text-lg"
              lightColor="#687076"
              darkColor="#9BA1A6"
            >
              {recipe.description}
            </ThemedText>
          </View>

          {/* Key Metrics */}
          <View className="flex flex-row justify-around px-6 mb-6">
            <View className="flex flex-row gap-2 items-center">
              <Ionicons
                name="alarm"
                size={24}
                color={isDark ? "white" : "black"}
              />
              <ThemedText
                className="text-sm"
                lightColor="#11181C"
                darkColor="#ECEDEE"
              >
                {recipe.time} min
              </ThemedText>
            </View>
            <View className="flex flex-row gap-2 items-center">
              <MaterialIcons
                name="people"
                size={24}
                color={isDark ? "white" : "black"}
              />
              <ThemedText
                className="text-sm"
                lightColor="#11181C"
                darkColor="#ECEDEE"
              >
                {details.servings} servings
              </ThemedText>
            </View>
            <View className="flex flex-row gap-2 items-center">
              <MaterialIcons
                name="whatshot"
                size={24}
                // color={"#f97316"}
                color={isDark ? "white" : "black"}
              />
              <ThemedText
                className="text-sm"
                lightColor="#11181C"
                darkColor="#ECEDEE"
              >
                {details.difficulty}
              </ThemedText>
            </View>
          </View>

          {/* Chef Information */}
          <View className="px-6 mb-6">
            <View className="flex flex-row items-center justify-between bg-gray-100 dark:bg-white/20 rounded-full p-4">
              <View className="flex flex-row items-center gap-3">
                <View className="size-12 rounded-full bg-gray-200 dark:bg-white/10 items-center justify-center">
                  <MaterialIcons
                    name="person"
                    size={24}
                    color={colorScheme === "dark" ? "white" : "#11181C"}
                  />
                </View>
                <View>
                  <ThemedText
                    className="text-base"
                    lightColor="#11181C"
                    darkColor="#ECEDEE"
                  >
                    {details.chef.name}
                  </ThemedText>
                  <ThemedText
                    className="text-sm"
                    lightColor="#687076"
                    darkColor="#9BA1A6"
                  >
                    {details.chef.title}
                  </ThemedText>
                </View>
              </View>
              <TouchableOpacity className="bg-gray-900 dark:bg-white rounded-full px-6 py-2 flex flex-row items-center gap-2">
                <MaterialIcons
                  name="add"
                  size={20}
                  color={colorScheme === "dark" ? "black" : "white"}
                />
                <ThemedText
                  className="font-semibold"
                  lightColor="white"
                  darkColor="black"
                >
                  Follow
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Ingredient Tags */}
          <View className="px-6 mb-6">
            {/* <ThemedText
              className="text-lg mb-3"
              lightColor="#11181C"
              darkColor="#ECEDEE"
            >
              Ingredients
            </ThemedText> */}
            <FlatList
              data={details.ingredients}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => `${item}-${index}`}
              contentContainerStyle={{ gap: 8 }}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  className={`rounded-full p-4 px-6 ${
                    index === 0
                      ? "bg-orange-500"
                      : "bg-gray-200 dark:bg-white/20 "
                    // : "bg-black/10 dark:bg-white/20 "
                  }`}
                >
                  <ThemedText
                    className=" text-xl"
                    lightColor={index === 0 ? "white" : "#11181C"}
                    darkColor={index === 0 ? "white" : "#ECEDEE"}
                  >
                    {item}
                  </ThemedText>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Instructions */}
          <View className="px-6">
            <ThemedText
              className="text-lg mb-4"
              lightColor="#11181C"
              darkColor="#ECEDEE"
            >
              Instructions
            </ThemedText>
            {details.instructions.map((instruction, index) => (
              <View
                key={index}
                className="flex flex-row items-start gap-4 mb-4 pb-4 border-b border-gray-200 dark:border-gray-800"
              >
                <View className="items-center">
                  <View className="size-10 rounded-full bg-orange-500 items-center justify-center">
                    <ThemedText className="text-white font-bold text-sm">
                      {String(instruction.step).padStart(2, "0")}
                    </ThemedText>
                  </View>
                  {index < details.instructions.length - 1 && (
                    <View className="w-0.5 h-full bg-gray-300 dark:bg-gray-700 mt-2" />
                  )}
                </View>
                <View className="flex-1">
                  <View className="flex flex-row items-center gap-2 mb-2">
                    <ThemedText className="text-2xl">
                      {instruction.icon}
                    </ThemedText>
                  </View>
                  <ThemedText
                    className="text-base leading-6"
                    lightColor="#687076"
                    darkColor="#9BA1A6"
                  >
                    {instruction.text}
                  </ThemedText>
                </View>
              </View>
            ))}
          </View>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({});

export default RecipeDetailScreen;
