import { ActivityIndicator, View } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useAuth } from "@/contexts/AuthContext"
import type { RootStackParamList } from "@/types/navigation"

// Auth Screens
import WelcomeScreen from "../screens/WelcomeScreen"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen"
import ResetPasswordScreen from "../screens/ResetPasswordScreen"

// App Screens
import MainTabNavigator from "./MainTabNavigator"
import MovieDetailsScreen from "../screens/MovieDetailsScreen"
import SearchResultsScreen from "../screens/SearchResultsScreen"
import AccountSettingsScreen from "../screens/AccountSettingsScreen"

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootNavigator() {
    const { user, isLoading } = useAuth()

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
                <ActivityIndicator size="large" color="#8A1111" />
            </View>
        )
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "#000" },
            }}
        >
            {user ? (
                // App screens
                <>
                    <Stack.Screen name="Main" component={MainTabNavigator} />
                    <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
                    <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
                    <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
                </>
            ) : (
                // Auth screens
                <>
                    <Stack.Screen name="Welcome" component={WelcomeScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
                </>
            )}
        </Stack.Navigator>
    )
}
