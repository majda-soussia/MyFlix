import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, StatusBar, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Ionicons } from "@expo/vector-icons"
import MovieCard from "../components/MovieCard"
import { LinearGradient } from "expo-linear-gradient"
import type { RootStackParamList } from "@/types/navigation"

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

type Movie = {
    _id: string
    title: string
    image: string
    rate: number
    genres: string[]
}

export default function HomeScreen() {
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
    const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const navigation = useNavigation<HomeScreenNavigationProp>()

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch("http://localhost:4000/api/films")
                const data = await res.json()
                // Split data for different sections
                setTrendingMovies(data.slice(0, 13))
                setRecommendedMovies(data.slice(13, 26))
            } catch (error) {
                console.error("Error fetching movies:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchMovies()
    }, [])

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigation.navigate("SearchResults", { query: searchQuery.trim() })
        }
    }

    const handleMoviePress = (movieId: string) => {
        navigation.navigate("MovieDetails", { id: movieId })
    }

    const renderMovieItem = ({ item }: { item: Movie }) => {
        return <MovieCard movie={item} onPress={() => handleMoviePress(item.id)} isHorizontal={true}/>
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient colors={["#4A0D0D", "#000000"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.header}>
                <Text style={styles.logo}>MyFlix</Text>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search movies..."
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={handleSearch}
                    />
                    <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                        <Ionicons name="search" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <View style={styles.content}>
                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>Loading movies...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={[
                            { title: "Trending Now", data: trendingMovies, key: "trending" },
                            { title: "Recommended for You", data: recommendedMovies, key: "recommended" },
                        ]}
                        keyExtractor={(item) => item.key}
                        renderItem={({ item }) => (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>{item.title}</Text>
                                <FlatList
                                    data={item.data}
                                    keyExtractor={(movie) => movie.id}
                                    renderItem={renderMovieItem}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.movieList}
                                />
                            </View>
                        )}
                    />
                )}
            </View>
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
        paddingTop: 10,
    },
    logo: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginBottom: 10,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    searchInput: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 5,
        padding: 10,
        color: "white",
        marginRight: 10,
    },
    searchButton: {
        padding: 5,
    },
    content: {
        flex: 1,
        padding: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        color: "white",
        fontSize: 16,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginBottom: 10,
        marginLeft: 5,
    },
    movieList: {
        paddingLeft: 5,
    },
})
