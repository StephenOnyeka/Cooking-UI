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
import { EvilIcons, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";

// import { TbBellRinging } from "react-icons/tb";

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
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
                  <View
                    key={item.id}
                    className="flex flex-col gap-1 items-center"
                  >
                    <View className="bg-white/20 border border-gray-700 size-20 rounded-full flex justify-center items-center">
                      <Image
                        source={item.image}
                        className={"rounded-full size-14"}
                      />
                    </View>
                    <Text className="text-center text-gray-500">
                      {item.name}
                    </Text>
                  </View>
                )}
              />
            </View>
            <View className="py-8 flex flex-row justify-between">
              <ThemedText className="font-semibold text-2xl">
                Trending Recipes
              </ThemedText>
              <View className="flex flex-row justify-center items-center">
                <Text className="text-gray-500 text-lg">See More </Text>
                <MaterialIcons name="chevron-right" size={20} color="gray" />
              </View>
            </View>

            {/* <FlatList
              data={foods}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{gap: 12}}
              renderItem={({ item }) => (
                <RecipeCard
                  image={item.image}
                  title={`${item.title} \n ${item.foodName}`}
                  time={`${item.time} mins`}
                  />
              )}
            /> */}

            {foods.map((item, index) => (
              <RecipeCard
                key={item.id || index}
                image={item.image}
                title={`${item.title}\n${item.foodName}`}
                time={`${item.time} mins`}
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
