import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, SafeAreaView } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { RouteProp } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import MovieCard from "../components/MovieCard"
import type { RootStackParamList } from "../types/navigation"

type SearchResultsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>
type SearchResultsScreenRouteProp = RouteProp<RootStackParamList, 'SearchResults'>

type Movie = {
    _id: string
    title: string
    image: string
    rate: number
    genres: string[]
}

export default function SearchResultsScreen() {
    const route = useRoute<SearchResultsScreenRouteProp>()
    const navigation = useNavigation<SearchResultsScreenNavigationProp>()

    const { query } = route.params

    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(`http://localhost:4000/api/films/title/${encodeURIComponent(query)}`)

                if (res.status === 404) {
                    setMovies([])
                    return
                }

                if (!res.ok) {
                    throw new Error("Server error")
                }

                const data = await res.json()
                const movieArray = Array.isArray(data) ? data : [data]
                setMovies(movieArray)
            } catch (error) {
                console.error("Error searching movies:", error)
                setMovies([])
            } finally {
                setIsLoading(false)
            }
        }

        fetchMovies()
    }, [query])

    const handleMoviePress = (movieId: string) => {
        navigation.navigate("MovieDetails", { id: movieId })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Search Results</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.queryContainer}>
                <Text style={styles.queryText}>
                    Results for: <Text style={styles.queryHighlight}>{query}</Text>
                </Text>
            </View>

            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#8A1111" />
                </View>
            ) : movies.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No movies found for "{query}"</Text>
                </View>
            ) : (
                <FlatList
                    data={movies}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <MovieCard movie={item} onPress={() => handleMoviePress(item.id)} />}
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "#111",
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    queryContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#333",
    },
    queryText: {
        color: "#aaa",
        fontSize: 16,
    },
    queryHighlight: {
        color: "white",
        fontWeight: "bold",
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
