import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

// * TODO - Change icons when active

export default function Layout() {
  return (
    <Tabs
      initialRouteName="timeline"
      screenOptions={{
        tabBarActiveTintColor: Colors.sgreen,
        tabBarInactiveTintColor: Colors.slightgrey,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,

        headerTransparent: true,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: Colors.sdarkgrey,
      }}
    >
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="timeline"
        options={{
          title: "Timeline",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="timer-sand-empty"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="recommendations"
        options={{
          title: "Recommendations",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="musical-notes-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#000",
    borderTopWidth: 0,
    height: 70,
    paddingBottom: 10,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  header: {
    backgroundColor: Colors.sdarkgrey,
    borderBottomWidth: 0,
  },
  headerTitle: {
    fontSize: 20,
    color: Colors.slightgrey,
  },
});
