import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Ionicons } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { LinearGradient } from "expo-linear-gradient"
import { useAuth } from "@/contexts/AuthContext"
import type { RootStackParamList } from "@/types/navigation"

type AccountSettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

export default function AccountSettingsScreen() {
    const navigation = useNavigation<AccountSettingsScreenNavigationProp>()
    const { user } = useAuth()

    const [activeTab, setActiveTab] = useState<"details" | "password">("details")
    const [isLoading, setIsLoading] = useState(false)

    // User details
    const [email, setEmail] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [birthday, setBirthday] = useState("")
    const [gender, setGender] = useState("")

    // Password change
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    useEffect(() => {
        if (user) {
            setEmail(user.email || "")
            setFirstname(user.firstname || "")
            setLastname(user.lastname || "")
            setBirthday(user.birthday || "")
            setGender(user.gender || "")
        }
    }, [user])

    const handleSaveDetails = async () => {
        if (!user) return

        try {
            setIsLoading(true)

            const response = await fetch(`http://localhost:4000/api/users/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstname,
                    lastname,
                    email,
                    birthday,
                    gender,
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to update user details")
            }

            const updatedUser = await response.json()

            // Update local storage
            const currentUser = JSON.parse((await AsyncStorage.getItem("currentUser")) || "{}")
            const newUserData = { ...currentUser, ...updatedUser }
            await AsyncStorage.setItem("currentUser", JSON.stringify(newUserData))

            Alert.alert("Success", "Your details have been updated")
            navigation.goBack()
        } catch (error) {
            Alert.alert("Error", error instanceof Error ? error.message : "An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    const handleChangePassword = async () => {
        if (!user) return

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match")
            return
        }

        try {
            setIsLoading(true)

            const response = await fetch(`http://localhost:4000/api/users/confirmpassword/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    newpassword: password,
                    newpasswordComfirm: confirmPassword,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "Failed to change password")
            }

            Alert.alert("Success", "Your password has been updated")
            setPassword("")
            setConfirmPassword("")
        } catch (error) {
            Alert.alert("Error", error instanceof Error ? error.message : "An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={["#4A0D0D", "#000000"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Account Settings</Text>
                <View style={{ width: 40 }} />
            </LinearGradient>

            <View style={styles.tabs}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === "details" && styles.activeTab]}
                    onPress={() => setActiveTab("details")}
                >
                    <Text style={[styles.tabText, activeTab === "details" && styles.activeTabText]}>My Details</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === "password" && styles.activeTab]}
                    onPress={() => setActiveTab("password")}
                >
                    <Text style={[styles.tabText, activeTab === "password" && styles.activeTabText]}>Password</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                {activeTab === "details" ? (
                    <View style={styles.form}>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Email"
                                placeholderTextColor="#999"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>First Name</Text>
                            <TextInput
                                style={styles.input}
                                value={firstname}
                                onChangeText={setFirstname}
                                placeholder="First name"
                                placeholderTextColor="#999"
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Last Name</Text>
                            <TextInput
                                style={styles.input}
                                value={lastname}
                                onChangeText={setLastname}
                                placeholder="Last name"
                                placeholderTextColor="#999"
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Birthday</Text>
                            <TextInput
                                style={styles.input}
                                value={birthday}
                                onChangeText={setBirthday}
                                placeholder="YYYY-MM-DD"
                                placeholderTextColor="#999"
                            />
                        </View>

                        <View style={styles.formGroup}>
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

                        <TouchableOpacity style={styles.saveButton} onPress={handleSaveDetails} disabled={isLoading}>
                            <Text style={styles.saveButtonText}>{isLoading ? "Saving..." : "Save Changes"}</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.form}>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>New Password</Text>
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Enter new password"
                                placeholderTextColor="#999"
                                secureTextEntry
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Confirm Password</Text>
                            <TextInput
                                style={styles.input}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                placeholder="Confirm new password"
                                placeholderTextColor="#999"
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity style={styles.saveButton} onPress={handleChangePassword} disabled={isLoading}>
                            <Text style={styles.saveButtonText}>{isLoading ? "Changing..." : "Change Password"}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    tabs: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#333",
    },
    tab: {
        flex: 1,
        paddingVertical: 15,
        alignItems: "center",
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: "#8A1111",
    },
    tabText: {
        color: "#888",
        fontSize: 16,
    },
    activeTabText: {
        color: "white",
        fontWeight: "bold",
    },
    content: {
        flex: 1,
        padding: 20,
    },
    form: {
        marginBottom: 20,
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        color: "white",
        marginBottom: 5,
        fontWeight: "bold",
    },
    input: {
        backgroundColor: "#1a1a1a",
        borderRadius: 5,
        padding: 12,
        color: "white",
        fontSize: 16,
    },
    pickerContainer: {
        backgroundColor: "#1a1a1a",
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
    saveButton: {
        backgroundColor: "#8A1111",
        borderRadius: 5,
        padding: 15,
        alignItems: "center",
        marginTop: 20,
    },
    saveButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
})
