import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

type User = {
    _id: string
    email: string
    firstname: string
    lastname: string
    birthday?: string
    gender?: string
}

type AuthContextType = {
    user: User | null
    isLoading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (userData: RegisterData) => Promise<void>
    logout: () => Promise<void>
    resetPassword: (email: string) => Promise<void>
    confirmResetPassword: (id: string, password: string, confirmPassword: string) => Promise<void>
}

type RegisterData = {
    email: string
    firstname: string
    lastname: string
    password: string
    confirmPassword: string
    birthday: string
    gender: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check if user is logged in
        const loadUser = async () => {
            try {
                const userString = await AsyncStorage.getItem("currentUser")
                if (userString) {
                    setUser(JSON.parse(userString))
                }
            } catch (error) {
                console.error("Failed to load user from storage", error)
            } finally {
                setIsLoading(false)
            }
        }
        loadUser()
    }, [])

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true)
            const res = await fetch("http://localhost:4000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.error || data.message || "Login failed")
            }

            await AsyncStorage.setItem("currentUser", JSON.stringify(data.user))
            await AsyncStorage.setItem("userId", data.user._id)
            setUser(data.user)
        } catch (error) {
            console.error("Login error:", error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const register = async (userData: RegisterData) => {
        try {
            setIsLoading(true)
            const res = await fetch("http://localhost:4000/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || data.message || "Registration failed")
            }

            return data
        } catch (error) {
            console.error("Registration error:", error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async () => {
        try {
            await AsyncStorage.removeItem("currentUser")
            await AsyncStorage.removeItem("userId")
            setUser(null)
        } catch (error) {
            console.error("Logout error:", error)
            throw error
        }
    }

    const resetPassword = async (email: string) => {
        try {
            const res = await fetch("http://localhost:4000/api/users/sendemail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || data.message || "Password reset failed")
            }

            return data
        } catch (error) {
            console.error("Password reset error:", error)
            throw error
        }
    }

    const confirmResetPassword = async (id: string, password: string, confirmPassword: string) => {
        try {
            const res = await fetch(`http://localhost:4000/api/users/confirmpassword/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    newpassword: password,
                    newpasswordComfirm: confirmPassword,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || data.message || "Password confirmation failed")
            }

            return data
        } catch (error) {
            console.error("Password confirmation error:", error)
            throw error
        }
    }

    const value = {
        user,
        isLoading,
        login,
        register,
        logout,
        resetPassword,
        confirmResetPassword,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
