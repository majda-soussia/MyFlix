import React, { useState } from 'react';

type ItemProps = {
  title: string;
  imageUrl: string;
  rating?: number;
  type?: string;
  onClick?: () => void;
};

const Item: React.FC<ItemProps> = ({ title, imageUrl, rating, type, onClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsFavorite((prev) => !prev);
  };

  return (
    <div
      onClick={onClick}
      className="w-60 p-4 bg-white shadow rounded-xl cursor-pointer hover:shadow-lg transition relative"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-36 object-cover rounded-md mb-3"
      />

      {/* Heart icon */}
      <img
        src={isFavorite ? '/heart-full.png' : '/heart-empty.png'}
        alt="favorite"
        onClick={toggleFavorite}
        className="w-6 h-6 absolute top-3 right-3 cursor-pointer"
      />

      <h2 className="text-lg font-semibold truncate">{title}</h2>
      {type && <p className="text-sm text-blue-600">{type}</p>}
      {rating !== undefined && (
        <p className="text-sm text-yellow-500">⭐ {rating.toFixed(1)}</p>
      )}
    </div>
  );
};

export default Item;
