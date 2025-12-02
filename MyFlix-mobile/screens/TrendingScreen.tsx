import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { LinearGradient } from "expo-linear-gradient"
import MovieCard from "../components/MovieCard"
import type { RootStackParamList } from "@/types/navigation"

type TrendingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

type Movie = {
    _id: string
    title: string
    image: string
    rate: number
    genres: string[]
}

export default function TrendingScreen() {
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const navigation = useNavigation<TrendingScreenNavigationProp>()

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                const res = await fetch("http://localhost:4000/api/films")
                const data = await res.json()
                setTrendingMovies(data)
            } catch (error) {
                console.error("Error fetching trending movies:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchTrendingMovies()
    }, [])

    const handleMoviePress = (movieId: string) => {
        navigation.navigate("MovieDetails", { id: movieId })
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={["#4A0D0D", "#000000"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.header}>
                <Text style={styles.headerTitle}>Trending Movies</Text>
            </LinearGradient>

            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#8A1111" />
                </View>
            ) : (
                <FlatList
                    data={trendingMovies}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <MovieCard movie={item} onPress={() => handleMoviePress(item.id)} isHorizontal={false}/>}
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
    movieGrid: {
        padding: 10,
    },
})
