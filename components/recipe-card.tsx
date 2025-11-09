import {
  EvilIcons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, TouchableOpacity, useColorScheme, View } from "react-native";
import { ThemedText } from "./themed-text";

export function RecipeCard({
  image,
  title,
  time,
  foodId,
  isFavorite = false,
  onToggleFavorite,
  onPress,
}: {
  image: any;
  title: string;
  time: string;
  foodId?: number;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onPress?: () => void;
}) {
  const [line1, line2] = title.split("\n");
  const colorScheme = useColorScheme(); // 'light' | 'dark'
  //   const heartColor = colorScheme === "dark" ? "white" : "#ef4444";
  const heartColor = colorScheme === "dark" ? "white" : "orange";

  // Dynamic gradient based on theme
  const gradientColors =
    colorScheme === "dark"
      ? (["rgba(0,0,0,0.3)", "rgba(0,0,0,0.9)", "transparent"] as const)
      : ([
          "rgba(255,255,255,0.7)",
          "rgba(255,255,255,0.95)",
          "transparent",
        ] as const);

  return (
    <View className="mb-4 overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-900">
      <View className="relative h-48 w-full">
        {/* Background Image (only on the right 60%) */}
        <Image
          source={image}
          className="absolute right-0 top-0 h-full w-4/6 rounded-r-3xl"
          resizeMode="cover"
        />

        {/* Black Gradient Fade from Left */}
        <View className="absolute inset-0">
          <LinearGradient
            colors={gradientColors}
            className="h-full w-full"
            start={{ x: 0, y: 0 }}
            end={{ x: 0.7, y: 0 }}
          />
        </View>

        {/* Top Icons (on image side) */}
        <View className="flex flex-row justify-between p-2 px-4">
          <TouchableOpacity
            onPress={onToggleFavorite}
            className="size-14 items-center justify-center rounded-full border border-gray-400 bg-white/30 backdrop-blur-sm"
            disabled={!onToggleFavorite}
          >
            <MaterialIcons
              name={isFavorite ? "favorite" : "favorite-outline"}
              size={20}
              color={heartColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPress}
            className="size-14 items-center justify-center rounded-full border border-gray-400 bg-white/90"
            disabled={!onPress}
          >
            <MaterialCommunityIcons
              name="arrow-top-right"
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* Text Content (on left, over black fade) */}
        {/* <View className="absolute left-0 top-0 h-full justify-center pl-6"> */}
        <View className="mt-2 px-4">
          <ThemedText
            className="text-3xl text-white drop-shadow-lg"
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.5}
          >
            {line1}
          </ThemedText>
          <ThemedText
            className="text-3xl text-white drop-shadow-lg"
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.5}
          >
            {line2}
          </ThemedText>

          <View className="flex flex-row items-center justify-center gap-2 rounded-full bg-gray-100 dark:bg-white/30 px-3 py-1.5 mt-2 backdrop-blur-sm border border-gray-300 dark:border-gray-600 w-24">
            <EvilIcons name="clock" size={18} color="white dark:black" />
            <ThemedText className="text-sm font-medium text-white">
              {time}
            </ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
}

// import React from 'react'

// export const RecipeCard = () => {
//   return (
//     <div>RecipeCard</div>
//   )
// }
