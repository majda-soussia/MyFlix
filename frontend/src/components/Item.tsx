import React, { useState } from "react";
import "../components/style/Item.css";
import ReactStars from "react-rating-stars-component";
type ItemProps = {
  id: number;
  title: string;
  imageUrl: string;
  rating?: number;
  type?: string;
  onClick?: (id: number) => void;
};

const Item: React.FC<ItemProps> = ({
  id,
  title,
  imageUrl,
  rating,
  type,
  onClick,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };
  const handleClick = () => {
    if (onClick) onClick(id);
  };
  return (
    <div className="item-card" onClick={handleClick}>
      <img className="item-image" src={imageUrl} alt={title} />

      <button className="heart-icon" onClick={toggleFavorite}>
        <img
          src={
            isFavorite ? "/images/fullheart1.png" : "/images/emptyheart1.png"
          }
          alt="favorite"
        />
      </button>

      <div className="item-info">
        <h3>{title}</h3>
        <p>{type}</p>
        <div className="star-rating">
          {rating !== undefined && (
            <ReactStars
              count={5}
              size={24}
              value={rating ? rating / 2 : 0}
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
