import { View, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

type CustomRatingProps = {
    rating: number
    maxRating?: number
    size?: number
    readonly?: boolean
    onRatingChange?: (rating: number) => void
    starColor?: string
    emptyStarColor?: string
}

export default function CustomRating({rating, maxRating = 5, size = 16, readonly = false, onRatingChange, starColor = "#FFD700", emptyStarColor = "#666",}: CustomRatingProps) {
    const handleStarPress = (selectedRating: number) => {
        if (!readonly && onRatingChange) {
            onRatingChange(selectedRating)
        }
    }

    const renderStar = (index: number) => {
        const starNumber = index + 1
        const isFilled = starNumber <= Math.round(rating)

        const StarComponent = readonly ? View : TouchableOpacity

        return (
            <StarComponent
                key={index}
                style={styles.star}
                onPress={readonly ? undefined : () => handleStarPress(starNumber)}
                activeOpacity={readonly ? 1 : 0.7}
            >
                <Ionicons name={isFilled ? "star" : "star-outline"} size={size} color={isFilled ? starColor : emptyStarColor} />
            </StarComponent>
        )
    }

    return <View style={styles.container}>{Array.from({ length: maxRating }, (_, index) => renderStar(index))}</View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    star: {
        marginHorizontal: 1,
        backgroundColor: "transparent",
    },
})
