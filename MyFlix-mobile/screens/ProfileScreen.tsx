import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { useAuth } from "@/contexts/AuthContext"
import type { RootStackParamList } from "@/types/navigation"
import { getRandomAvatar } from "@/utils/avatars"

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

export default function ProfileScreen() {
    const { user, logout } = useAuth()
    const navigation = useNavigation<ProfileScreenNavigationProp>()

    const handleLogout = async () => {
        try {
            await logout()
            // Navigation will be handled by RootNavigator when user state changes
        } catch (error) {
            Alert.alert("Logout Failed", "An error occurred while logging out")
        }
    }

    const handleEditProfile = () => {
        navigation.navigate("AccountSettings")
    }

    const formatDate = (dateString?: string) => {
        if (!dateString) return "Not set"

        try {
            const date = new Date(dateString)
            return date.toLocaleDateString()
        } catch (error) {
            return "Invalid date"
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={["#4A0D0D", "#000000"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.header}>
                <Text style={styles.headerTitle}>My Profile</Text>
            </LinearGradient>

            <ScrollView style={styles.content}>
                <View style={styles.profileHeader}>
                    <Image source={{
                        uri: user?.gender
                            ? getRandomAvatar(user.gender.toLowerCase() as "male" | "female")
                            : getRandomAvatar("male"),
                    }} style={styles.avatar} />
                    <Text style={styles.name}>
                        {user?.firstname} {user?.lastname}
                    </Text>
                    <Text style={styles.email}>{user?.email}</Text>
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Account Information</Text>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>First Name</Text>
                        <Text style={styles.infoValue}>{user?.firstname || "Not set"}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Last Name</Text>
                        <Text style={styles.infoValue}>{user?.lastname || "Not set"}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Email</Text>
                        <Text style={styles.infoValue}>{user?.email}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Birthday</Text>
                        <Text style={styles.infoValue}>{formatDate(user?.birthday)}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Gender</Text>
                        <Text style={styles.infoValue}>{user?.gender || "Not set"}</Text>
                    </View>
                </View>

                <View style={styles.actionsSection}>
                    <TouchableOpacity style={styles.actionButton} onPress={handleEditProfile}>
                        <Ionicons name="settings-outline" size={20} color="white" />
                        <Text style={styles.actionButtonText}>Edit Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionButton, styles.logoutButton]} onPress={handleLogout}>
                        <Ionicons name="log-out-outline" size={20} color="white" />
                        <Text style={styles.actionButtonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
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
        padding: 15,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },
    content: {
        flex: 1,
        padding: 20,
    },
    profileHeader: {
        alignItems: "center",
        marginBottom: 30,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: "#aaa",
    },
    infoSection: {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.1)",
    },
    infoLabel: {
        fontSize: 16,
        color: "#aaa",
    },
    infoValue: {
        fontSize: 16,
        color: "white",
    },
    actionsSection: {
        marginBottom: 30,
    },
    actionButton: {
        backgroundColor: "#333",
        borderRadius: 8,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
    },
    logoutButton: {
        backgroundColor: "#8A1111",
    },
    actionButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
    },
})
