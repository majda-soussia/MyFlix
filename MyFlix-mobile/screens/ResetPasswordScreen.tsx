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
} from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { RouteProp } from "@react-navigation/native"
import { useAuth } from "../contexts/AuthContext"
import { StatusBar } from "expo-status-bar"
import type { RootStackParamList } from "../types/navigation"

type ResetPasswordScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>
type ResetPasswordScreenRouteProp = RouteProp<RootStackParamList, 'ResetPassword'>

export default function ResetPasswordScreen() {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigation = useNavigation<ResetPasswordScreenNavigationProp>()
    const route = useRoute<ResetPasswordScreenRouteProp>()
    const { confirmResetPassword } = useAuth()

    // Get the user ID from route params
    const { id } = route.params

    const handleResetPassword = async () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert("Error", "Please fill in both fields")
            return
        }

        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match")
            return
        }

        try {
            setIsLoading(true)
            await confirmResetPassword(id, newPassword, confirmPassword)

            Alert.alert("Success", "Password updated successfully", [
                { text: "OK", onPress: () => navigation.navigate("Login") },
            ])
        } catch (error) {
            Alert.alert("Error", error instanceof Error ? error.message : "An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80' }} style={styles.background}>
            <StatusBar style="light" />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Reset Password</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>New Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter new password"
                            placeholderTextColor="#999"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm new password"
                            placeholderTextColor="#999"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword} disabled={isLoading}>
                        <Text style={styles.resetButtonText}>{isLoading ? "Resetting..." : "Reset Password"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.backButtonText}>Back to Login</Text>
                    </TouchableOpacity>
                </View>
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
    resetButton: {
        backgroundColor: "#1f4c8e",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    resetButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    backButton: {
        marginTop: 15,
        alignItems: "center",
    },
    backButtonText: {
        color: "white",
        fontSize: 16,
    },
})
