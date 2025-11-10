import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const OnboardingScreen = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.replace("/(tabs)");
  };

  return (
    <View className="flex-1 bg-black">
      {/* <StatusBar style="light" /> */}
      <SafeAreaView className="">
        <ImageBackground
          source={require("@/assets/images/Creativity.jpg")}
          resizeMode="cover"
          style={{ height: height * 0.93 }}
          className="justify-end"
        >
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.9)"]}
            locations={[0, 0.5, 1]}
            className="absolute inset-0"
          />
          {/* </ImageBackground> */}

          {/* Bottom Section - Content (50% of screen) */}
          <View className="w-full px-6 absolute bottom-0 ">
            {/* Main Title with Recipe Card Overlay */}
            <View className="flex flex-row items-start gap-8 mb-4">
              <View className="flex-1 pr-2">
                <Text
                  className="text-white font-bold leading-tight"
                  style={{ fontSize: 48 }}
                >
                  Cook.{"\n"}Eat. 😊{"\n"}Better!
                </Text>
              </View>
              {/* Recipe Card Overlay - positioned to the right */}
              <View
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
                style={{ width: 110, height: 110 }}
              >
                <Image
                  source={require("@/assets/foods/grilled-salmon.jpg")}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
            </View>

            {/* Subtitle */}
            <Text
              className="text-white leading-6 mb-8 opacity-90"
              style={{ fontSize: 16 }}
            >
              Delicious recipes for every taste and skill level.{"\n"}
              Easy. Fun. Healthy.
            </Text>

            {/* Get Started Button */}
            <TouchableOpacity
              onPress={handleGetStarted}
              className="bg-orange-500 relative rounded-full flex-row items-center justify-between px-6 mt-8"
              activeOpacity={0.8}
              style={{ minHeight: 56 }}
            >
              {/* Left: Checkmark in black circle */}
              <View
                style={styles.iconContainer}
                className="absolute left-0 border bg-black rounded-full"
              >
                <MaterialIcons
                  name="check"
                  size={20}
                  color="white"
                  className=""
                />
              </View>

              {/* Center: Get Started Text */}
              <Text
                className="text-white flex-1 text-center"
                style={{ fontSize: 18 }}
              >
                Get Started
              </Text>

              {/* Right: Double Chevrons */}
              <View className="flex-row items-center">
                <MaterialIcons name="chevron-right" size={20} color="white" />
                <MaterialIcons
                  name="chevron-right"
                  size={20}
                  color="white"
                  style={{ marginLeft: -12 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    marginLeft: 5,
    // borderRadius: 28,
  },
});

export default OnboardingScreen;

// import { MaterialIcons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import {
//   Dimensions,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const { width, height } = Dimensions.get("window");

// const OnboardingScreen = () => {
//   const router = useRouter();

//   const handleGetStarted = () => {
//     router.replace("/(tabs)");
//   };

//   return (
//     <View className="flex-1 bg-black">
//       {/* <StatusBar style="light" /> */}
//       <SafeAreaView className="flex-1">

//         {/* Top Section - Cooking Scene (50% of screen) */}
//         <View style={{ height: height * 0.6 }} className="relative">
//           {/* Dark background with cooking scene */}
//           <View className="absolute inset-0 bg-black">
//             {/* Gradient overlay for better text readability */}
//             <LinearGradient
//               colors={["transparent", "rgba(0,0,0,0.9)", "rgba(0,0,0,0.9)"]}
//               className="h-full w-full"
//               start={{ x: 0, y: 1 }}
//               end={{ x: 0, y: 1 }}
//             />

//             {/* Placeholder for cooking scene - you can replace this with actual image/video */}

//             {/* <View className="flex-1 items-center justify-center"> */}
//             <Image
//               source={require("@/assets/images/download.jpg")}
//               className="absolute right-0 top-0 h-full w-full rounded-r-3xl "
//               resizeMode="cover"
//             />
//             {/* </View> */}
//           </View>
//         </View>

//         {/* Bottom Section - Content (50% of screen) */}
//         {/* <View className="flex-1 px-6 pb-8 justify-end"> */}
//         <View className="flex-1 px-6 pb-8 justify-end">
//           {/* Main Title with Recipe Card Overlay */}
//           <View className="flex flex-row items-start gap-8 mb-4">
//             <View className="flex-1 pr-4">
//               <Text
//                 className="text-white font-bold leading-tight"
//                 style={{ fontSize: 48 }}
//               >
//                 Cook.{"\n"}Eat. 😊{"\n"}Better!
//               </Text>
//             </View>
//             {/* Recipe Card Overlay - positioned to the right */}
//             <View
//               className="bg-white rounded-2xl overflow-hidden shadow-lg"
//               style={{ width: 110, height: 110 }}
//             >
//               <Image
//                 source={require("@/assets/foods/grilled-salmon.jpg")}
//                 className="w-full h-full"
//                 resizeMode="cover"
//               />
//             </View>
//           </View>

//           {/* Subtitle */}
//           <Text
//             className="text-white leading-6 mb-8 opacity-90"
//             style={{ fontSize: 16 }}
//           >
//             Delicious recipes for every taste and skill level.{"\n"}
//             Easy. Fun. Healthy.
//           </Text>

//           {/* Get Started Button */}
//           <TouchableOpacity
//             onPress={handleGetStarted}
//             className="bg-orange-500 relative rounded-full flex-row items-center justify-between px-6 mt-8"
//             activeOpacity={0.8}
//             style={{ minHeight: 56 }}
//           >
//             {/* Left: Checkmark in black circle */}
//             <View style={styles.iconContainer} className="absolute left-0 border bg-black rounded-full" >
//               <MaterialIcons
//                 name="check"
//                 size={20}
//                 color="white"
//                 className=""
//               />
//             </View>

//             {/* Center: Get Started Text */}
//             <Text
//               className="text-white flex-1 text-center"
//               style={{ fontSize: 18 }}
//             >
//               Get Started
//             </Text>

//             {/* Right: Double Chevrons */}
//             <View className="flex-row items-center">
//               <MaterialIcons name="chevron-right" size={20} color="white" />
//               <MaterialIcons
//                 name="chevron-right"
//                 size={20}
//                 color="white"
//                 style={{ marginLeft: -12 }}
//               />
//             </View>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   iconContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     width: 50,
//     height: 50,
//     marginLeft: 5,
//     // borderRadius: 28,
//   },
// });

// export default OnboardingScreen;
