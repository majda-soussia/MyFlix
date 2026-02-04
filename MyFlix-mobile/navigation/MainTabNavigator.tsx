import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import type { MainTabParamList } from "@/types/navigation"

import HomeScreen from "../screens/HomeScreen"
import FavoritesScreen from "../screens/FavoritesScreen"
import TrendingScreen from "../screens/TrendingScreen"
import ProfileScreen from "../screens/ProfileScreen"

const Tab = createBottomTabNavigator<MainTabParamList>()

export default function MainTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#111",
                    borderTopColor: "#333",
                    height: 60,
                    paddingBottom: 10,
                },
                tabBarActiveTintColor: "#8A1111",
                tabBarInactiveTintColor: "#888",
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Trending"
                component={TrendingScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="trending-up" color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="heart" color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
                }}
            />
        </Tab.Navigator>
    )
}
