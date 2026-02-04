import { useState } from "react"
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useAuth } from "../contexts/AuthContext"
import { StatusBar } from "expo-status-bar"
import type { RootStackParamList } from "../types/navigation"

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")

    const navigation = useNavigation<ForgotPasswordScreenNavigationProp>()
    const { resetPassword } = useAuth()

    const handleSendLink = async () => {
        if (!email) {
            setMessage("Please enter your email address")
            return
        }

        try {
            setIsLoading(true)
            await resetPassword(email)
            setMessage("✅ Reset link sent to your email")
        } catch (error) {
            setMessage(`❌ Error: ${error instanceof Error ? error.message : "An error occurred"}`)
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

                    <Text style={styles.instructions}>Enter your email to receive the reset link:</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="you@example.com"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <TouchableOpacity style={styles.sendButton} onPress={handleSendLink} disabled={isLoading}>
                        <Text style={styles.sendButtonText}>{isLoading ? "Sending..." : "Send Link"}</Text>
                    </TouchableOpacity>

                    {message ? (
                        <Text style={[styles.message, message.startsWith("✅") ? styles.successMessage : styles.errorMessage]}>
                            {message}
                        </Text>
                    ) : null}

                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
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
    instructions: {
        color: "white",
        marginBottom: 15,
        textAlign: "center",
    },
    input: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#555",
        borderRadius: 5,
        padding: 12,
        color: "white",
        fontSize: 16,
        marginBottom: 20,
    },
    sendButton: {
        backgroundColor: "#1f4c8e",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    sendButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    message: {
        marginTop: 15,
        textAlign: "center",
        fontSize: 16,
    },
    successMessage: {
        color: "#4CAF50",
    },
    errorMessage: {
        color: "#F44336",
    },
    backButton: {
        marginTop: 20,
        alignItems: "center",
    },
    backButtonText: {
        color: "white",
        fontSize: 16,
    },
})
