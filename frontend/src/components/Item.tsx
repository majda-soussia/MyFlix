import React, { useState } from "react";
import "../components/style/Item.css";
import ReactStars from "react-rating-stars-component";
type ItemProps = {
  id: number;
  title: string;
  image: string;
  rate: number;
  genres: string[];
  onClick?: (id: number) => void;
  onHeartClick: (id: number) => void;
  isFavorite: boolean;
};

const Item: React.FC<ItemProps> = ({
  id,
  title,
  image,
  rate,
  genres,
  onClick,
  onHeartClick,
  isFavorite
}) => {
  const [Favorite, setFavorite] = useState(false);

  const handleClick = () => {
    if (onClick) onClick(id);
  };
  const handleHeartClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      console.log("Film ID cliqué:", id); // Affiche l'ID dans la console
      onHeartClick(id); // Transmet l'ID au composant parent
    };
  return (
    <div className="item-card" onClick={handleClick}>
     <img
        className="item-image"
        src={image || '/images/placeholder.jpg'}
        alt={title}
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
        }}
      />
      <button className="heart-icon" onClick={handleHeartClick}>
        <img
          src={
            isFavorite ? "/images/fullheart1.png" : "/images/emptyheart1.png"
          }
          alt="favorite"
        />
      </button>

      <div className="item-info">
        <h3>{title}</h3>
        <p>{genres?.join(", ") || "Genre inconnu"}</p>
        <div className="star-rating">
          {rate !== undefined && (
            <ReactStars
              count={5}
              size={24}
              value={rate ? rate / 2 : 0}
              edit={false}
              isHalf={true}
              activeColor="gold"
            />
          )}
        </div>
      </div>
    </div>
  );
};


export default Item;
