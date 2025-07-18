import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Item from "./Item.tsx";

interface Film {
  id: number;
  title: string;
  image: string;
  rate: number;
  genres: string[];
}

const ListMoviesSearch: React.FC = () => {
  const { title } = useParams();
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilmByTitle = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/films/title/${encodeURIComponent(title || "")}`);
        if (!res.ok) {
          if (res.status === 404) {
            setFilms([]);
            return;
          }
          throw new Error("Erreur serveur");
        }
        const data = await res.json();
        // S'assurer que c'est un tableau même si un seul film
        const filmArray = Array.isArray(data) ? data : [data];
        setFilms(filmArray);
      } catch (err) {
        console.error(err);
        setFilms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilmByTitle();
  }, [title]);

  if (loading) return <div style={{ color: "white", padding: "20px" }}>Chargement...</div>;

  if (films.length === 0) {
    return <div style={{ color: "white", padding: "20px" }}>Aucun film trouvé pour : <strong>{title}</strong></div>;
  }

  return (
    <div style={{ padding: "40px", background: "#000", color: "white" }}>
      <h2 style={{ marginBottom: "20px" }}>
        Résultats pour : <em>{title}</em>
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {films.map((film) => (
          <Item
            key={film.id}
            id={film.id}
            title={film.title}
            image={film.image?.startsWith("http") ? film.image : `http://localhost:4000/${film.image}`}
            rate={film.rate}
            genres={film.genres}
            onClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default ListMoviesSearch;
