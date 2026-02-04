import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { LinearGradient } from "expo-linear-gradient"
import AsyncStorage from "@react-native-async-storage/async-storage"
import MovieCard from "../components/MovieCard"
import type { RootStackParamList } from "@/types/navigation"

type FavoritesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

type Movie = {
    _id: string
    title: string
    image: string
    rate: number
    genres: string[]
}

export default function FavoritesScreen() {
    const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const navigation = useNavigation<FavoritesScreenNavigationProp>()

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            try {
                // Get favorite movie IDs from AsyncStorage
                const favoriteIds = JSON.parse((await AsyncStorage.getItem("favorites")) || "[]")

                if (favoriteIds.length === 0) {
                    setFavoriteMovies([])
                    setIsLoading(false)
                    return
                }

                // Fetch details for each favorite movie
                const moviePromises = favoriteIds.map(async (id: string) => {
                    const res = await fetch(`http://localhost:4000/api/films/${id}`)
                    if (!res.ok) throw new Error(`Error fetching movie ${id}`)
                    return await res.json()
                })

                const movies = await Promise.all(moviePromises)
                setFavoriteMovies(movies)
            } catch (error) {
                console.error("Error fetching favorite movies:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchFavoriteMovies()

        // Add listener for when the screen comes into focus
        const unsubscribe = navigation.addListener("focus", fetchFavoriteMovies)
        return unsubscribe
    }, [navigation])

    const handleMoviePress = (movieId: string) => {
        navigation.navigate("MovieDetails", { id: movieId })
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={["#4A0D0D", "#000000"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.header}>
                <Text style={styles.headerTitle}>My Favorites</Text>
            </LinearGradient>

            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#8A1111" />
                </View>
            ) : favoriteMovies.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>You have no favorite movies yet.</Text>
                </View>
            ) : (
                <FlatList
                    data={favoriteMovies}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <MovieCard movie={item} onPress={() => handleMoviePress(item.id)} isFavorite={true} />
                    )}
                    numColumns={2}
                    contentContainerStyle={styles.movieGrid}
                />
            )}
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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    emptyText: {
        color: "#888",
        fontSize: 16,
        textAlign: "center",
    },
    movieGrid: {
        padding: 10,
    },
})
