import React, { useState } from "react";
import "../components/style/Item.css";

type ItemProps = {
  id: number;
  title: string;
  image: string;
  rate: number;
  genres: string[];
  onClick: (id: number) => void;
};

const Item: React.FC<ItemProps> = ({
  id,
  title,
  image,
  rate,
  genres = [], // valeur par défaut vide
  onClick,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };

  const handleClick = () => {
    onClick(id);
  };

  return (
    <div className="item-card" onClick={handleClick}>
      <img className="item-image" src={image} alt={title} />

      <button className="heart-icon" onClick={toggleFavorite}>
        <img
          src={
            isFavorite
              ? "/images/fullheart1.png"
              : "/images/emptyheart1.png"
          }
          alt="favorite"
        />
      </button>

    <div className="item-info">
      <h3>{title}</h3>
      <p>{Array.isArray(genres) ? genres.join(", ") : "Genre inconnu"}</p>
      <p className="text-sm text-yellow-400">
        ⭐ {typeof rate === "number" ? rate.toFixed(1) : "N/A"}
      </p>
    </div>

    </div>
  );
};

export default Item;
