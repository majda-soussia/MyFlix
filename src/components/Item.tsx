import React from "react";
import "../components/style/Item.css";

type ItemProps = {
  id: number;
  title: string;
  image: string;
  rate: number;
  genres: string[];
  onClick: (id: number) => void;
  onHeartClick: (id: number) => void; // Nouvelle prop pour le clic sur le cœur
};

const Item: React.FC<ItemProps> = ({
  id,
  title,
  image,
  rate,
  genres,
  onClick,
  onHeartClick,
}) => {
  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Film ID cliqué:", id); // Affiche l'ID dans la console
    onHeartClick(id); // Transmet l'ID au composant parent
  };

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
      <button className="heart-icon" onClick={handleHeartClick}>
        <img
          src="/images/emptyheart1.png" // Vous pouvez gérer l'état du cœur ici
          alt="favorite"
        />
      </button>
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