// src/data/mockMovies.ts

export type FavoriteItem = {
    id: number;
    title: string;
    image: string;
    rate: number;
    genres: string[];
  };
  
  export const mockMovies: FavoriteItem[] = [
    {
        id: 1,
        title: "Inception",
        image: "/images/inception.jpg",
        rate: 8.8,
        genres: ["Action", "Sci-Fi"],
      },
      {
        id: 2,
        title: "Interstellar",
        image: "/images/interstella.jpg",
        rate: 9.0,
        genres: ["Adventure", "Drama", "Sci-Fi"],
      },
      {
        id: 3,
        title: "Moonfall",
        image: "/images/moonfall.png",
        rate: 7.1,
        genres: ["Action", "Sci-Fi"],
      },
      {
        id: 4,
        title: "Dune",
        image: "/images/dune.jpg",
        rate: 8.1,
        genres: ["Sci-Fi", "Adventure", "Drama"]
      },
  ];
  