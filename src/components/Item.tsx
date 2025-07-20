import React from "react";
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
  genres,
  onClick,
}) => {

  return (
    <div className="item-card" onClick={() => onClick(id)}>
      <img
        className="item-image"
        src={image || '/images/placeholder.jpg'}
        alt={title}
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
        }}
      />
      <div className="item-info">
        <h3>{title}</h3>
        <p>{genres?.join(", ") || "Genre inconnu"}</p>
        <p className="text-sm text-yellow-400">
          ⭐ {typeof rate === 'number' ? rate.toFixed(1) : 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default Item;