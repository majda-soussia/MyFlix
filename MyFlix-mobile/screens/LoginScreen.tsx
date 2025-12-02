import { useState } from "react"
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useAuth } from "@/contexts/AuthContext"
import { StatusBar } from "expo-status-bar"
import type { RootStackParamList } from "@/types/navigation"

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

export default function LoginScreen() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigation = useNavigation<LoginScreenNavigationProp>()
    const { login } = useAuth()

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields")
            return
        }

        try {
            setIsLoading(true)
            await login(email, password)
            // Navigation will be handled by RootNavigator when user state changes
        } catch (error) {
            Alert.alert("Login Failed", error instanceof Error ? error.message : "An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80' }} style={styles.background}>
            <StatusBar style="light" />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.formContainer}>
                        <Text style={styles.title}>Login</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor="#999"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                placeholderTextColor="#999"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
                            <Text style={styles.loginButtonText}>{isLoading ? "Logging in..." : "LOGIN"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate("ForgotPassword")}
                            style={styles.forgotPassword}
                        >
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <View style={styles.registerContainer}>
                            <Text style={styles.registerText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                                <Text style={styles.registerLink}>REGISTER</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 20,
    },
    formContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        borderRadius: 10,
        padding: 20,
        width: "100%",
        maxWidth: 400,
        alignSelf: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginBottom: 20,
        textAlign: "center",
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        color: "white",
        marginBottom: 5,
        fontWeight: "bold",
    },
    input: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#555",
        borderRadius: 5,
        padding: 12,
        color: "white",
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: "#1f4c8e",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    loginButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    forgotPassword: {
        marginTop: 15,
        alignSelf: "center",
    },
    forgotPasswordText: {
        color: "white",
        fontWeight: "bold",
    },
    registerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    registerText: {
        color: "white",
    },
    registerLink: {
        color: "white",
        fontWeight: "bold",
    },
})
