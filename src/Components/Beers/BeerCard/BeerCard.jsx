import React from "react";
import "./style.css";
import { useBeers } from "../../../Store/useBeers/useBeers";

export const BeerCard = ({
  name,
  tagline,
  description,
  image_url,
  id,
  beer,
}) => {
  const toogleCard = useBeers((state) => state.toggledCard);
  const isSelected = useBeers((state) => state.selectedCards.includes(id));

  const handleContexMenu = (event) => {
    event.preventDefault();
    toogleCard(id);
  };
  return (
    <div
      className={`beerCart ${isSelected ? "selected" : ""}`}
      onContextMenu={handleContexMenu}
      key={id}
      {...beer}
    >
      <div className="fotoContainer">
        <img src={`${image_url}`} alt={`${name}`} />
      </div>
      <div className="beerCardText">
        <span>{name}</span>
        <span>{tagline}</span>
        <span>{description}</span>
      </div>
    </div>
  );
};
