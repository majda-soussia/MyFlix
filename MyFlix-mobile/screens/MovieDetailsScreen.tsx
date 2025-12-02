import { useState, useEffect} from "react"
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Alert,
    SafeAreaView,
} from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { RouteProp } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useAuth } from "@/contexts/AuthContext"
import type { RootStackParamList } from "@/types/navigation"
import CustomRating from "@/components/CustomRating";

type MovieDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>
type MovieDetailsScreenRouteProp = RouteProp<RootStackParamList, 'MovieDetails'>

type Movie = {
    _id: string
    title: string
    image: string
    rate: number
    genres: string[]
    year?: number
    duration?: string
    description?: string
}

type Comment = {
    id: string
    text: string
    gender: "male" | "female"
    avatar: string
    userName: string
    userId : string
    createdAt: string
}

export default function MovieDetailsScreen() {
    const route = useRoute<MovieDetailsScreenRouteProp>()
    const navigation = useNavigation<MovieDetailsScreenNavigationProp>()
    const { user } = useAuth()

    const { id } = route.params

    const [movie, setMovie] = useState<Movie | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isFavorite, setIsFavorite] = useState(false)
    const [userRating, setUserRating] = useState<number>(0)
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState<Comment[]>([])

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await fetch(`http://localhost:4000/api/films/${id}`)
                const data = await res.json()
                setMovie(data)
                // Check if movie is in favorites
                const favorites = JSON.parse((await AsyncStorage.getItem("favorites")) || "[]")
                setIsFavorite(favorites.includes(id))

                // Load comments for this movie
                const storedComments = JSON.parse((await AsyncStorage.getItem("movieComments")) || "{}")
                setComments(storedComments[id] || [])
            } catch (error) {
                console.error("Error fetching movie details:", error)
                Alert.alert("Error", "Failed to load movie details")
            } finally {
                setIsLoading(false)
            }
        }
        fetchMovie()
    }, [id])

    const toggleFavorite = async () => {
        try {
            const userId = await AsyncStorage.getItem("userId")
            if (!userId) {
                Alert.alert("Error", "You must be logged in to add favorites")
                return
            }

            if (isFavorite) {
                // Remove from favorites
                await fetch("http://localhost:4000/api/users/favorites/remove", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId, movieId: id }),
                })

                const favorites = JSON.parse((await AsyncStorage.getItem("favorites")) || "[]")
                const updatedFavorites = favorites.filter((favId: string) => favId !== id)
                await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites))
            } else {
                // Add to favorites
                await fetch("http://localhost:4000/api/users/favorites/add", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId, movieId: id }),
                })

                const favorites = JSON.parse((await AsyncStorage.getItem("favorites")) || "[]")
                const updatedFavorites = [...favorites, id]
                await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites))
            }

            setIsFavorite(!isFavorite)
        } catch (error) {
            console.error("Error updating favorites:", error)
            Alert.alert("Error", "Failed to update favorites")
        }
    }

    const generateCommentId = (): string => {
        return `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }

    const handleAddComment = async () => {
        if (!comment.trim()) return

        if (!user) {
            Alert.alert("Error", "You must be logged in to comment")
            return
        }

        const gender = (user.gender || "male") as "male" | "female"

        const newComment: Comment = {
            id : generateCommentId(),
            text: comment.trim(),
            gender,
            avatar: gender === "male" ? "../assets/images/avatarm1.png" : "../assets/images/avatarf1.png",
            userName: `${user.firstname} ${user.lastname}`,
            userId : user._id,
            createdAt: new Date().toISOString(),
        }

        // Add comment to local state
        const updatedComments = [newComment, ...comments]
        setComments(updatedComments)

        // Save to AsyncStorage
        const storedComments = JSON.parse((await AsyncStorage.getItem("movieComments")) || "{}")
        storedComments[id] = updatedComments
        await AsyncStorage.setItem("movieComments", JSON.stringify(storedComments))

        // Clear input
        setComment("")
    }

    const handleDeleteComment = async (commentId : String) => {
        if (!id) return

        const commentToDelete = comments.find((c)=> c.id === commentId)
        if (!commentToDelete) return

        if(commentToDelete.userId !== id) return

        try {
            const updatedComments = comments.filter((c) => c.id !== commentId)
            setComments(updatedComments)

            const storedComments = JSON.parse((await AsyncStorage.getItem("movieComments")) || "{}")
            storedComments[id] = updatedComments
            await AsyncStorage.setItem("movieComments", JSON.stringify(storedComments))

            Alert.alert("Success", "Comment deleted successfully")
        } catch (error) {
            console.error("Error deleting comment:", error)
            Alert.alert("Error", "Failed to delete comment")
        }
    }

    const formatCommentDate = (dateString: string): string => {
        try {
            const date = new Date(dateString)
            const now = new Date()
            const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

            if (diffInMinutes < 1) return "Just now"
            if (diffInMinutes < 60) return `${diffInMinutes}m ago`
            if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
            if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`
            return date.toLocaleDateString()
        } catch (error) {
            return "Unknown"
        }
    }

    const getImageUrl = (imageUrl?: string): string => {
        if (!imageUrl) {
            // Return a placeholder image if no image is provided
            return "/placeholder.svg?height=450&width=300&text=No+Image"
        }

        if (imageUrl.startsWith("http")) {
            return imageUrl
        }

        return `http://localhost:4000/${imageUrl}`
    }

    const renderCommentItem = (c: Comment, index: number) => {
        const isOwner = c.userId === user?._id

        return (
            <View key={c.id} style={styles.commentItem}>
                <Image
                    source={
                        c.gender === "male"
                            ? {
                                uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                            }
                            : {
                                uri: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                            }
                    }
                    style={styles.commentAvatar}
                />
                <View style={styles.commentContent}>
                    <View style={styles.commentHeader}>
                        <View style={styles.commentUserInfo}>
                            <Text style={styles.commentUsername}>{c.userName}</Text>
                            <Text style={styles.commentDate}>{formatCommentDate(c.createdAt)}</Text>
                        </View>
                        {isOwner && (
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => handleDeleteComment(c.id)}
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            >
                                <Ionicons name="trash-outline" size={16} color="#FF6B6B" />
                            </TouchableOpacity>
                        )}
                    </View>
                    <Text style={styles.commentText}>{c.text}</Text>
                </View>
            </View>
        )
    }

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#8A1111" />
            </View>
        )
    }

    if (!movie) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Movie not found</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
                        <Ionicons
                            name={isFavorite ? "heart" : "heart-outline"}
                            size={24}
                            color={isFavorite ? "#8A1111" : "white"}
                        />
                    </TouchableOpacity>
                </View>

                <Image
                    source={{ uri: getImageUrl(movie.image) }}
                    style={styles.poster}
                    resizeMode="cover"
                />

                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{movie.title}</Text>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoText}>
                            {movie.year || "2024"} • {movie.genres?.join(", ") || "Genre"} • {movie.duration || "2h 30m"}
                        </Text>
                    </View>

                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingLabel}>Average Rating:</Text>
                        <CustomRating
                            rating={movie.rate ? movie.rate / 2 : 0}
                            size={20}
                            readonly={true}
                            starColor="#FFD700"
                            emptyStarColor="#444"
                        />
                        <Text style={styles.ratingValue}>{(movie.rate / 2).toFixed(1)}/5</Text>
                    </View>

                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingLabel}>Your Rating:</Text>
                        <CustomRating
                            rating={userRating}
                            size={24}
                            readonly={false}
                            onRatingChange={setUserRating}
                            starColor="#FFD700"
                            emptyStarColor="#444"
                        />
                    </View>

                    <Text style={styles.description}>
                        {movie.description || "No description available for this movie. Please check back later."}
                    </Text>

                    <View style={styles.commentsSection}>
                        <Text style={styles.sectionTitle}>Comments ({comments.length})</Text>

                        <View style={styles.commentInputContainer}>
                            <TextInput
                                style={styles.commentInput}
                                placeholder="Write your thoughts..."
                                placeholderTextColor="#999"
                                value={comment}
                                onChangeText={setComment}
                                multiline
                            />
                            <TouchableOpacity style={styles.commentButton} onPress={handleAddComment}>
                                <Text style={styles.commentButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>

                        {comments.length > 0 ? (
                            comments.map((c, index) => renderCommentItem(c, index))) : (
                            <Text style={styles.noCommentsText}>No comments yet. Be the first to comment!</Text>
                        )}
                    </View>
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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        padding: 20,
    },
    errorText: {
        color: "white",
        fontSize: 18,
        marginBottom: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    backButtonText: {
        color: "white",
        fontSize: 16,
    },
    favoriteButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    poster: {
        width: "100%",
        height: 450,
    },
    detailsContainer: {
        padding: 20,
        backgroundColor: "#000",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "white",
        marginBottom: 10,
    },
    infoRow: {
        marginBottom: 15,
    },
    infoText: {
        color: "#aaa",
        fontSize: 14,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    ratingLabel: {
        color: "white",
        fontSize: 16,
        marginRight: 10,
    },
    rating: {
        marginRight: 10,
    },
    ratingValue: {
        color: "white",
        fontSize: 16,
    },
    description: {
        color: "white",
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 30,
    },
    commentsSection: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginBottom: 15,
    },
    commentInputContainer: {
        marginBottom: 20,
    },
    commentInput: {
        backgroundColor: "#1a1a1a",
        borderRadius: 8,
        padding: 15,
        color: "white",
        fontSize: 16,
        minHeight: 100,
        textAlignVertical: "top",
        marginBottom: 10,
    },
    commentButton: {
        backgroundColor: "#8A1111",
        borderRadius: 8,
        padding: 12,
        alignItems: "center",
    },
    commentButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    commentItem: {
        flexDirection: "row",
        marginBottom: 15,
        backgroundColor: "#1a1a1a",
        padding: 15,
        borderRadius: 8,
    },
    commentAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    commentContent: {
        flex: 1,
    },
    commentHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 8,
    },
    commentUserInfo: {
        flex: 1,
    },
    commentDate: {
        color: "#888",
        fontSize: 12,
        marginTop: 2,
    },
    deleteButton: {
        padding: 4,
        borderRadius: 4,
        backgroundColor: "rgba(255, 107, 107, 0.1)",
    },
    commentUsername: {
        color: "white",
        fontWeight: "bold",
        marginBottom: 5,
    },
    commentText: {
        color: "#ddd",
    },
    noCommentsText: {
        color: "#888",
        fontStyle: "italic",
        textAlign: "center",
        marginTop: 10,
    },
})
