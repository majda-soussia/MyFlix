import React, { useState, useEffect } from "react";
import MovieDetails from "./MovieDetails.tsx";
import Item from "./Item.tsx";
import { useNavigate } from "react-router-dom";
const Trend: React.FC = () => {
  type TrendingItem = {
    id: number;
    title: string;
    image: string;
    rate: number;
    genres: string[];
  };
  const [trendingItems, setTrendingItems] = useState<TrendingItem[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<TrendingItem | null>(null);
  const [currentIndex, setCurrentIndex] =useState(0); /*l’indice de l’élément de départ  visible dans le carousel.*/
  const [itemsPerView, setItemsPerView] =useState(4); /* nombre d’éléments visibles en même temps dans le carousel.*/
  const [visibleItems, setVisibleItems] = useState<TrendingItem[]>([]);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]); /* contient les éléments (objets) à afficher actuellement dans le carousel.*/
  const navigate = useNavigate();
  useEffect(() => {
     const fetchTrending = async () => {
       try {
         const res = await fetch("http://localhost:4000/api/films");
         const data = await res.json();
         setTrendingItems(data);
       } catch (error) {
         console.error("Erreur lors du fetch des films :", error);
       }
     };
     fetchTrending();
   }, []);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1280) {
        setItemsPerView(6);
      } else if (width >= 1024 && width <= 1280) {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (trendingItems.length === 0) return;
    const newVisibleItems = [];
    for (let i = 0; i < itemsPerView; i++) {
      const index = (currentIndex + i) % trendingItems.length;
      newVisibleItems.push(trendingItems[index]);
    }
    setVisibleItems(newVisibleItems);
  }, [currentIndex, itemsPerView, trendingItems]);
  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? trendingItems.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === trendingItems.length - 1 ? 0 : prev + 1
    );
  };
  

  const handleClick = (id: number) => {
    navigate(`/movie/${id}`);
  };
  

  const handleHeartClick = (movieId: number) => {
    console.log("ID du film cliqué:", movieId);
    setFavorites(prev => 
      prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };
  return (
    <div
      style={{
        marginBottom: "0px",
        padding: "40px",
        background:
          "linear-gradient(90deg,rgba(64, 8, 10, 1) 0%, rgba(0, 0, 0, 1) 6%, rgba(0, 0, 0, 1) 41%, rgba(0, 0, 0, 1) 51%, rgba(0, 0, 0, 1) 56%, rgba(0, 0, 0, 1) 95%, rgba(0, 0, 0, 1) 100%)",
      }}
    >
      <h2
        style={{
          color: "#ffffff",
          fontSize: "28px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        Trending at this moment
      </h2>
      <div
        style={{
          position: "relative",
          maxWidth: "1700px",
          margin: "0 auto",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            margin: "0 auto",
            transition: "transform 0.4s ease-in-out",
          }}
        >
          {visibleItems.map((item) => (
            <div key={item.id} style={{ minWidth: "250px" }}>
              <Item
                id={item.id}
                title={item.title}
                image={
                  item.image?.startsWith("http")
                    ? item.image
                    : `http://localhost:4000/${item.image}`
                }
                rate={item.rate}
                genres={item.genres}
                onClick={handleClick}
                onHeartClick={handleHeartClick}
                isFavorite={favorites.includes(item.id)}
              />
              
            </div>
          ))}
        </div>
        <div
          style={{
            position: "relative", // essentiel pour que les flèches se placent bien
            maxWidth: "1700px",
            margin: "0 auto",
            overflow: "hidden",
          }}
        ></div>
        <button
          onClick={handlePrev}
          style={navButtonStyle("left")}
          aria-label="Previous items"
        >
          &lt;
        </button>

        <button
          onClick={handleNext}
          style={navButtonStyle("right")}
          aria-label="Next items"
        >
          &gt;
        </button>
      </div>
      <div>
        {selectedMovie && (
          <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          isFavorite={favorites.includes(selectedMovie.id)}
          toggleFavorite={() => handleHeartClick(selectedMovie.id)}
          userRating={userRating}
          setUserRating={setUserRating}
          />
        )}
      </div>
    </div>
  );
};
const navButtonStyle = (position: "left" | "right") => ({
  position: "absolute" as const,
  [position]: "0px",
  top: "calc(50% - 22px)",
  transform: "translateY(-50%)",
  zIndex: 10,
  background: "#4A0D0D",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "44px",
  height: "44px",
  fontSize: "20px",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
  transition: "transform 0.2s",
  outline: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0.9,
  hover: {
    background: "#e64a19",
  },
});
export default Trend;
