import React, { useEffect } from "react";
import { useBeers } from "../../Store/useBeers/useBeers";
import "./style.css";
import { BeerCard } from "./BeerCard/BeerCard";
import { shallow } from "zustand/shallow";

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

  const limitedBeers = beers.slice(0, 5);

  useEffect(() => {
    if (!beers.length) {
      fetchBeers(currentPageOfBeers);
    }
    function handleScroll() {
      const scrolableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scroledHeight = window.scrollY;
      if (scroledHeight > scrolableHeight * 0.8) {
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [beers, currentPageOfBeers, fetchBeers]);
  return (
    <div className="beerWrapper">
      {isLoading ? (
        <h1>Loading ... </h1>
      ) : (
        limitedBeers.map((beer) => (
          <BeerCard
            key={beer.id}
            id={beer.id}
            name={beer.name}
            tagline={beer.tagline}
            description={beer.description}
            image_url={beer.image_url}
            beer={beer}
          />
        ))
      )}
      {selectedCards.length > 0 ? (
        <button onClick={handleDeleteSelected}>Delete this beers ?</button>
      ) : null}
    </div>
  );
};
