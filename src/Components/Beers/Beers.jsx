import React, { useEffect } from "react";
import { useBeers } from "../../Store/useBeers/useBeers";
import "./style.css";
import { BeerCard } from "./BeerCard/BeerCard";
import { shallow } from "zustand/shallow";
import { Link } from "react-router-dom";

export const Beers = () => {
  const { beers } = useBeers(
    (state) => ({
      beers: state.beers,
    }),
    shallow
  );
  const currentPageOfBeers = useBeers(
    (state) => state.currentPageOfBeers,
    shallow
  );
  const { fetchBeers, isLoading } = useBeers(
    (state) => ({
      fetchBeers: state.fetchBeers,
      isLoading: state.isLoading,
    }),
    shallow
  );
  const selectedCards = useBeers((state) => state.selectedCards, shallow);
  const deleteCard = useBeers((state) => state.deleteCard, shallow);

  const handleDeleteSelected = () => {
    deleteCard();
  };

  useEffect(() => {
    if (!beers.length) {
      fetchBeers(currentPageOfBeers);
    }
  }, [beers]);

  const limitedBeers = beers.slice(10, 15);
  return (
    <div className="beerWrapper">
      {isLoading ? (
        <h1>Loading ... </h1>
      ) : (
        limitedBeers.map((beer) => (
          <Link to={`/beer/${beer.id}`} key={beer.id}>
            <BeerCard
              key={beer.id}
              id={beer.id}
              name={beer.name}
              tagline={beer.tagline}
              description={beer.description}
              image_url={beer.image_url}
              beer={beer}
            />
          </Link>
        ))
      )}
      {selectedCards.length > 0 ? (
        <button onClick={handleDeleteSelected}>Delete this beers ?</button>
      ) : null}
    </div>
  );
};
