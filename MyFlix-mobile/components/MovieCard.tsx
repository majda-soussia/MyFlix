import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import CustomRating from "@/components/CustomRating";

type Movie = {
    _id: string
    title: string
    image: string
    rate: number
    genres: string[]
}

type MovieCardProps = {
    movie: Movie
    onPress: () => void
    isFavorite?: boolean
    isHorizontal?: boolean
}

const { width: screenWidth } = Dimensions.get("window")

export default function MovieCard({ movie, onPress, isFavorite = false, isHorizontal = false }: MovieCardProps) {
    const imageUrl = movie.image.startsWith("http") ? movie.image : `http://localhost:4000/${movie.image}`
    const cardWidth = isHorizontal ? 140 : (screenWidth - 30) / 2 - 5
    return (
        <TouchableOpacity style={[styles.container, isHorizontal ? styles.horizontalContainer : styles.gridContainer, { width: cardWidth }]} onPress={onPress}>
            <View style={styles.card}>
                <Image source={{ uri: imageUrl }} style={[styles.image, isHorizontal ? styles.horizontalImage : styles.gridImage]} resizeMode="cover" />

                {isFavorite && (
                    <View style={styles.favoriteIcon}>
                        <Ionicons name="heart" size={20} color="#8A1111" />
                    </View>
                )}

                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={1}>
                        {movie.title}
                    </Text>

                    <Text style={styles.genres} numberOfLines={1}>
                        {movie.genres?.join(", ") || "Genre unknown"}
                    </Text>

                    <View style={styles.ratingContainer}>
                        <CustomRating rating={movie.rate / 2} size={12} readonly={true} starColor="#FFD700" emptyStarColor="#444" />
                        <Text style={styles.ratingText}>{(movie.rate / 2).toFixed(1)}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "50%",
        padding: 5,
    },
    horizontalContainer: {
        marginBottom: 0,
    },
    gridContainer: {
        marginBottom: 10,
    },
    card: {
        backgroundColor: "#1a1a1a",
        borderRadius: 8,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: 200,
    },
    horizontalImage: {
        height: 180,
    },
    gridImage: {
        height: 200,
    },
    favoriteIcon: {
        position: "absolute",
        top: 8,
        right: 8,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: 12,
        padding: 4,
    },
    info: {
        padding: 10,
    },
    title: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    genres: {
        color: "#aaa",
        fontSize: 12,
        marginBottom: 6,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    ratingText: {
        color: "#ffb700",
        fontSize: 12,
        marginLeft: 8,
        fontWeight: "600",
    },
})
