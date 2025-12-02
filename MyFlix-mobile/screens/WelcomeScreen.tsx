import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { LinearGradient } from "expo-linear-gradient"
import type { RootStackParamList } from "@/types/navigation"

type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

export default function WelcomeScreen() {
    const navigation = useNavigation<WelcomeScreenNavigationProp>()

    return (
        <LinearGradient colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.9)"]} style={styles.container}>
            <View style={styles.overlay}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>🎬</Text>
                </View>
                <Text style={styles.title}>MyFlix</Text>
                <Text style={styles.subtitle}>Enjoy the newest movies</Text>

                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.loginButtonText}>Log in</Text>
                </TouchableOpacity>

                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>No account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={styles.signupLink}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        width: "100%",
        alignItems: "center",
        padding: 20,
    },
    logoContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "rgba(138, 17, 17, 0.2)",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    logoText: {
        fontSize: 60,
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        color: "white",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: "#ccc",
        marginBottom: 40,
    },
    loginButton: {
        backgroundColor: "#8A1111",
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 8,
        marginBottom: 20,
    },
    loginButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    signupContainer: {
        flexDirection: "row",
        marginTop: 20,
    },
    signupText: {
        color: "white",
        fontSize: 16,
    },
    signupLink: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
})
