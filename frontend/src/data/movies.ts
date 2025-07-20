export type Movie = {
  id: number;
  title: string;
  imageUrl: string;
  rating: number;
  type: string;
  description: string;
  genres: string[];
};
export const movies = [
  {
    id: 1,
    title: "Black Adam",
    imageUrl: "/images/blackadam.png",
    rating: 8.8,
    type: "Action",
    description: "An anti-hero from ancient times is unleashed in the modern world to deliver his unique form of justice.",
    genres: ["Action", "Superhero"]
  },
  {
    id: 2,
    title: "Moonfall",
    imageUrl: "/images/moonfall.png",
    rating: 7.1,
    type: "Action",
    description: "When a mysterious force knocks the moon from its orbit, Earth faces imminent destruction unless a team can stop it.",
    genres: ["Action", "Sci-Fi"]
  },
  {
    id: 3,
    title: "The Batman",
    imageUrl: "/images/batman.jpg",
    rating: 8.2,
    type: "Action",
    description: "Batman ventures into Gotham’s underworld to uncover corruption and bring justice as a new vigilante detective.",
    genres: ["Action", "Crime", "Drama"]
  },
  {
    id: 4,
    title: "Avengers: Endgame",
    imageUrl: "/images/avengers.jpg",
    rating: 8.4,
    type: "Action/Sci-Fi",
    description: "The Avengers reassemble one final time in a time-traveling mission to undo Thanos's destruction.",
    genres: ["Action", "Sci-Fi", "Adventure"]
  },
  {
    id: 5,
    title: "Dune",
    imageUrl: "/images/dune.jpg",
    rating: 8.1,
    type: "Sci-Fi",
    description: "Paul Atreides leads a rebellion to control the spice trade on the desert planet Arrakis.",
    genres: ["Sci-Fi", "Adventure", "Drama"]
  },
  {
    id: 6,
    title: "Inception",
    imageUrl: "/images/inception.jpg",
    rating: 8.8,
    type: "Sci-Fi/Thriller",
    description: "A skilled thief enters the dreams of others to plant ideas, but the mission becomes a dangerous maze of reality.",
    genres: ["Sci-Fi", "Thriller", "Mystery"]
  },
  {
    id: 7,
    title: "Interstellar",
    imageUrl: "/images/interstella.jpg",
    rating: 8.6,
    type: "Sci-Fi",
    description: "A group of astronauts travel through a wormhole in search of a new home for humanity.",
    genres: ["Sci-Fi", "Adventure", "Drama"]
  },
  {
    id: 8,
    title: "Joker",
    imageUrl: "/images/joker.jpg",
    rating: 8.5,
    type: "Drama/Crime",
    description: "A failed stand-up comedian’s descent into madness becomes a dangerous revolution in Gotham.",
    genres: ["Drama", "Crime", "Psychological"]
  }
];
export const trendingItems = movies.slice(0, 6);
export const recommendedItems = movies.slice(4);