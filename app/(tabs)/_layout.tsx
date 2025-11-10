import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
          borderTopWidth: 0,
          borderRadius: 100,
          height: 70,
          margin: 20,
          position: "absolute",
          bottom: 10,

          paddingBottom: 15,
          paddingTop: 15,
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
        },
        tabBarInactiveTintColor: "#9BA1A6",
        tabBarActiveTintColor: "#9BA1A6",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => {
            const iconColor = focused ? "white" : isDark ? "white" : "black";
            return (
              <View
                style={[
                  styles.homeIconContainer,
                  focused && styles.homeIconContainerActive,
                ]}
              >
                <Ionicons name="home" size={24} color={iconColor} />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) => {
            const iconColor = focused ? "white" : isDark ? "white" : "black";
            return (
              <View
                style={[
                  styles.iconContainer,
                  focused && styles.homeIconContainerActive,
                ]}
              >
                <Ionicons name="search-outline" size={24} color={iconColor} />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ focused }) => {
            const iconColor = focused ? "white" : isDark ? "white" : "black";
            return (
              <View
                style={[
                  styles.iconContainer,
                  focused && styles.homeIconContainerActive,
                ]}
              >
                <MaterialIcons
                  name="bookmark-outline"
                  size={24}
                  color={iconColor}
                />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => {
            const iconColor = focused ? "white" : isDark ? "white" : "black";
            return (
              <View
                style={[
                  styles.iconContainer,
                  focused && styles.homeIconContainerActive,
                ]}
              >
                <Ionicons name="person-outline" size={24} color={iconColor} />
              </View>
            );
          },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  homeIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  homeIconContainerActive: {
    backgroundColor: "#f97316",
    shadowColor: "#f97316",
    borderRadius: 100,
    // shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    // elevation: 8,
  },
});
