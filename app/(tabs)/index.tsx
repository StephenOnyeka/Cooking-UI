import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { categories } from "@/constants/categories";
import {
  EvilIcons,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

// import { TbBellRinging } from "react-icons/tb";

const HomeScreen = () => {
  return (
    <SafeAreaView className="px-2">
      {/* <ScrollView> */}
      <ThemedView>
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-row items-center gap-2">
            <Image
              source={require("@/assets/images/favicon.png")}
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
                  <Text className="text-center text-gray-500">{item.name}</Text>
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
          {/* 
          <View className="mb-16  border border-gray-500 rounded-3xl p-4">
            <ImageBackground source={require('@/assets/foods/chicken-tuscan.jpg')} className="rounded-3xl" style={{ height: 200 }}>
            <View className="flex flex-row justify-between items-center pb-4">
              <View className="flex items-center justify-center size-14 border border-gray-500 rounded-full bg-white/20 text-red-400"><MaterialIcons name="favorite-outline" size={20} className="text-red-400" color="white" /></View>
              <View className="flex items-center justify-center size-14 border border-gray-500 rounded-full bg-white/90"><MaterialCommunityIcons name="arrow-top-right" size={20} color="black" /></View>
            </View>
            <ThemedText className="text-3xl">Creamy Tuscan</ThemedText>
            <ThemedText className="text-3xl">Chicken</ThemedText>
            <View className="bg-white/20 p-2 mt-2 w-24 flex flex-row justify-center items-center gap-2 rounded-full">
              <EvilIcons name="clock" size={16} color="gray" />
              <Text className="text-gray-500">15 mins</Text>
            </View>
            </ImageBackground>
          </View> */}

          {/* <View className="mb-16  border border-gray-500 rounded-3xl p-4">
            <ImageBackground source={require('@/assets/foods/chicken-tuscan.jpg')} className="mb-16  border border-gray-500 rounded-3xl p-4 bg-black/50">
            <View className="flex flex-row justify-between items-center pb-4">
              <View className="flex items-center justify-center size-14 border border-gray-500 rounded-full bg-white/20 text-red-400"><MaterialIcons name="favorite-outline" size={20} className="text-red-400" color="white" /></View>
              <View className="flex items-center justify-center size-14 border border-gray-500 rounded-full bg-white/90"><MaterialCommunityIcons name="arrow-top-right" size={20} color="black" /></View>
            </View>
            <ThemedText className="text-3xl">Creamy Tuscan</ThemedText>
            <ThemedText className="text-3xl">Chicken</ThemedText>
            <View className="bg-white/20 p-2 mt-2 w-24 flex flex-row justify-center items-center gap-2 rounded-full">
              <EvilIcons name="clock" size={16} color="gray" />
              <Text className="text-gray-500">15 mins</Text>
            </View>
            </ImageBackground>
          </View> */}


          <View className="mb-6 overflow-hidden rounded-3xl border border-gray-500">
            <ImageBackground
              source={require("@/assets/foods/chicken-tuscan.jpg")}
              className="h-64 justify-end" // Full height card
              resizeMode="cover"
            >
              {/* Black Gradient Overlay (70% image → 30% fade) */}
              <View className="absolute inset-0">
                <LinearGradient
                  colors={["", "rgba(0,0,0,1)"]}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  className="h-full w-full"
                />
              </View>

              {/* Top Icons */}
              <View className="flex-row justify-between items-start p-4">
                <View className="size-12 items-center justify-center rounded-full border border-gray-400 bg-white/30 backdrop-blur-sm">
                  <MaterialIcons
                    name="favorite-outline"
                    size={22}
                    color="white"
                  />
                </View>
                <View className="size-12 items-center justify-center rounded-full border border-gray-400 bg-white/90">
                  <MaterialCommunityIcons
                    name="arrow-top-right"
                    size={22}
                    color="black"
                  />
                </View>
              </View>

              {/* Bottom Content (on gradient) */}
              <View className="px-4 pb-6">
                <ThemedText className="text-3xl font-bold text-white drop-shadow-md">
                  Creamy Tuscan
                </ThemedText>
                <ThemedText className="text-3xl font-bold text-white drop-shadow-md">
                  Chicken
                </ThemedText>

                <View className="mt-3 flex-row items-center gap-2 rounded-full bg-white/30 px-3 py-1.5 backdrop-blur-sm">
                  <EvilIcons name="clock" size={18} color="white" />
                  <Text className="text-sm font-medium text-white">
                    15 mins
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </View>

        </View>
      </ThemedView>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;

// import { Image } from 'expo-image';
// import { Platform, StyleSheet } from 'react-native';

// import { HelloWave } from '@/components/hello-wave';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { Link } from 'expo-router';

// const HomeScreen = () => {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <ThemedText>Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12',
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <Link href="/modal">
//           <Link.Trigger>
//             <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//           </Link.Trigger>
//           <Link.Preview />
//           <Link.Menu>
//             <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
//             <Link.MenuAction
//               title="Share"
//               icon="square.and.arrow.up"
//               onPress={() => alert('Share pressed')}
//             />
//             <Link.Menu title="More" icon="ellipsis">
//               <Link.MenuAction
//                 title="Delete"
//                 icon="trash"
//                 destructive
//                 onPress={() => alert('Delete pressed')}
//               />
//             </Link.Menu>
//           </Link.Menu>
//         </Link>

//         <ThemedText>
//           {`Tap the Explore tab to learn more about what's included in this starter app.`}
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           {`When you're ready, run `}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });

// export default HomeScreen;
