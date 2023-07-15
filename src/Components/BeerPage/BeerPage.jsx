import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSingleBeer } from "../../Store/useSingleBeer/useSingleBeer";
import { v4 as uuidv4 } from "uuid";

export const BeerPage = () => {
  const id = useParams();
  const { fetchBeer, beer } = useSingleBeer();

  useEffect(() => {
    fetchBeer(id.id);
  }, []);
  return (
    <>
      {beer.length > 0 ? (
        <div>
          <img src={`${beer[0].image_url}`} alt="" />
          <h1>{beer[0].name}</h1>
          <h3>{beer[0].tagline}</h3>
          <p>{beer[0].description}</p>
          <p>First brewed in {beer[0].first_brewed}</p>
          <p> {beer[0].attenuation_level}% customer drink it often</p>
          <p>
            Volume : {beer[0].volume.value} {beer[0].volume.unit}{" "}
          </p>
          <p>
            Boil volume : {beer[0].boil_volume.value} {beer[0].boil_volume.unit}{" "}
          </p>
          <h2>Metod cooked</h2>

          <ul>
            <li>
              Fermentation temperature: {beer[0].method.fermentation.temp.value}{" "}
              {beer[0].method.fermentation.temp.unit}
            </li>
            <li>
              Mash Malt temperature :{" "}
              {beer[0].method.mash_temp.map((temp) => (
                <p key={uuidv4()}>
                  {temp.temp.value} {temp.temp.unit} :{temp.duration} hours
                </p>
              ))}
            </li>
            {beer[0].method.twist !== null ? (
              <li>Twists : {beer[0].method.twist}</li>
            ) : null}
          </ul>
          <h2>Ingregients</h2>
          <ul>
            <li>
              Malt :{" "}
              {beer[0].ingredients.malt.map((malt) => (
                <p key={uuidv4()}>
                  {malt.name} : {malt.amount.value} {malt.amount.unit}
                </p>
              ))}
            </li>
            <li>
              Hops:
              {beer[0].ingredients.hops.map((hops) => (
                <p key={uuidv4()}>
                  {hops.name} : {hops.amount.value} {hops.amount.unit} and this
                  on {hops.add} and he has attribute {hops.attribute}
                </p>
              ))}
            </li>
            <li>
              Yeast : <p>{beer[0].ingredients.yeast}</p>
            </li>
          </ul>
          <h2>Food pairing</h2>
          <ul>
            {beer[0].food_pairing.map((food) => (
              <li key={uuidv4()}>{food}</li>
            ))}
          </ul>
          <h3>{beer[0].brewers_tips}</h3>
          <h5>{beer[0].contributed_by}</h5>
        </div>
      ) : null}
    </>
  );
};
