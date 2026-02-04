import { View, Text, StyleSheet, TouchableOpacity, ImageBackground} from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { RouteProp } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import type { RootStackParamList } from "@/types/navigation"

type EmailVerificationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>
type EmailVerificationScreenRouteProp = RouteProp<RootStackParamList, "EmailVerification">

export default function EmailVerificationScreen() {
    const navigation = useNavigation<EmailVerificationScreenNavigationProp>()
    const route = useRoute<EmailVerificationScreenRouteProp>()
    const { email } = route.params
    const handleBackToLogin = () => {
        navigation.navigate("Login")
    }

    return (
        <ImageBackground
            source={{
                uri: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            }}
            style={styles.background}
        >
            <StatusBar style="light" />
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Check Your Email</Text>

                    <Text style={styles.message}>We've sent a verification link to:</Text>

                    <Text style={styles.email}>{email}</Text>

                    <Text style={styles.instructions}>
                        Click the link in the email to verify your account. If you don't see the email, check your spam folder.
                    </Text>
                    <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
                        <Text style={styles.backButtonText}>Back to Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    message: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 10,
    },
    email: {
        color: "#4CAF50",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    instructions: {
        color: "#ccc",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 30,
        lineHeight: 20,
    },
    resendButton: {
        backgroundColor: "#1f4c8e",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 15,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    resendButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    backButton: {
        alignItems: "center",
    },
    backButtonText: {
        color: "white",
        fontSize: 16,
    },
})
