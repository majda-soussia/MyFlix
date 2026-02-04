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
import { Picker } from "@react-native-picker/picker"
import { StatusBar } from "expo-status-bar"
import type { RootStackParamList } from "@/types/navigation"

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

export default function RegisterScreen() {
    const [email, setEmail] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [birthday, setBirthday] = useState("")
    const [gender, setGender] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigation = useNavigation<RegisterScreenNavigationProp>()
    const { register } = useAuth()

    const handleRegister = async () => {
        if (!email || !firstname || !lastname || !password || !confirmPassword || !birthday || !gender) {
            Alert.alert("Error", "Please fill in all fields")
            return
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match")
            return
        }

        try {
            setIsLoading(true)
            await register({
                email,
                firstname,
                lastname,
                password,
                confirmPassword,
                birthday,
                gender,
            })

            navigation.navigate("EmailVerification", { email })
        } catch (error) {
            Alert.alert("Registration Failed", error instanceof Error ? error.message : "An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80' }} style={styles.background}>
            <StatusBar style="light" />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.formContainer}>
                        <Text style={styles.title}>Create Account</Text>

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
                            <Text style={styles.label}>First Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your first name"
                                placeholderTextColor="#999"
                                value={firstname}
                                onChangeText={setFirstname}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Last Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your last name"
                                placeholderTextColor="#999"
                                value={lastname}
                                onChangeText={setLastname}
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

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Confirm Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm your password"
                                placeholderTextColor="#999"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Date of Birth</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="YYYY-MM-DD"
                                placeholderTextColor="#999"
                                value={birthday}
                                onChangeText={setBirthday}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Gender</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={gender}
                                    onValueChange={(itemValue) => setGender(itemValue)}
                                    style={styles.picker}
                                    dropdownIconColor="white"
                                >
                                    <Picker.Item label="Select" value="" style={styles.pickerItem} />
                                    <Picker.Item label="Female" value="Female" style={styles.pickerItem} />
                                    <Picker.Item label="Male" value="Male" style={styles.pickerItem} />
                                </Picker>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={isLoading}>
                            <Text style={styles.registerButtonText}>{isLoading ? "Registering..." : "REGISTER"}</Text>
                        </TouchableOpacity>

                        <View style={styles.loginContainer}>
                            <Text style={styles.loginText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                <Text style={styles.loginLink}>LOGIN</Text>
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
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#555",
        borderRadius: 5,
        overflow: "hidden",
    },
    picker: {
        color: "white",
        backgroundColor: "#1a1a1a",
    },
    pickerItem: {
        backgroundColor: "#1a1a1a",
        color: "white",
        fontSize: 16,
    },
    registerButton: {
        backgroundColor: "#1f4c8e",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    registerButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    loginText: {
        color: "white",
    },
    loginLink: {
        color: "white",
        fontWeight: "bold",
    },
})
