import React, { useEffect, useState, useRef } from "react";
import { useBeers } from "../../Store/useBeers/useBeers";
import "./style.css";
import { BeerCard } from "./BeerCard/BeerCard";
import { shallow } from "zustand/shallow";
import { Link } from "react-router-dom";

export const Beers = () => {
  const [beersCount, setBeersCount] = useState(1);

  const refBottomComponent = useRef(null);
  const refContainer = useRef(null);

  const { beers } = useBeers(
    (state) => ({
      beers: state.beers,
    }),
    shallow
  );

  const handleScroll = (e) => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight -
        refContainer.current.offsetHeight / (beersCount * 5)
    ) {
      setBeersCount((prev) => prev + 1);
    }
  };

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

  const getBeer = () => {
    return beers.slice(0, beersCount * 5);
  };

  useEffect(() => {
    if (!beers.length) {
      fetchBeers(currentPageOfBeers).then(getBeer);
      setBeersCount((prev) => 1);
    }
  }, [beers]);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [beersCount]);

  return (
    <div id="container">
      {isLoading ? (
        <h1>Loading ... </h1>
      ) : (
        <>
          <div ref={refContainer}>
            {getBeer().map((beer) => (
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
            ))}
          </div>

          <div ref={refBottomComponent}></div>
        </>
      )}
      {selectedCards.length > 0 ? (
        <button onClick={handleDeleteSelected}>Delete this beers ?</button>
      ) : null}
    </div>
  );
};
