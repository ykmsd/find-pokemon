import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './Pokemon.css';
import { detailSettings, getArrayValueHTML } from './Pokemon.helpers';

const Pokemon = props => {
  const [matchedPokemon, setMatchedPokemon] = useState([]);

  const getMatchedPokemon = fetchedPokemon => {
    return fetchedPokemon.filter(pokemon => {
      const isTextMatchedPokemon =
        pokemon.type
          .map(type => type.toLowerCase())
          .includes(props.searchText) ||
        pokemon.name.toLowerCase().includes(props.searchText);

      if (!isTextMatchedPokemon) {
        return false;
      }
      /** Return everything if no weakness and height fitler */
      if (!props.selectedWeakness && !props.selectedHeight) {
        return true;
      }
      /** Return matched two criteria if both filteres are selected */
      if (props.selectedWeakness && props.selectedHeight) {
        return (
          pokemon.weaknesses.includes(props.selectedWeakness) &&
          pokemon.height === props.selectedHeight
        );
      }
      return (
        pokemon.weaknesses.includes(props.selectedWeakness) ||
        pokemon.height === props.selectedHeight
      );
    });
  };

  useEffect(() => {
    if (props.fetchedData) {
      setMatchedPokemon(getMatchedPokemon(props.fetchedData));
    }
  }, [
    props.fetchedData,
    props.searchText,
    props.selectedWeakness,
    props.selectedHeight
  ]);

  const content = (
    <div className="grid">
      {matchedPokemon.map(pokemon => (
        <div key={pokemon.name} className="flex">
          <LazyLoadImage
            src={pokemon.img}
            alt={pokemon.name}
            className="image mr2"
            width="120"
            height="120"
          />
          <div>
            <h2 className="f3 mb2">{pokemon.name}</h2>
            <ul>
              {detailSettings.map(setting => (
                <li key={setting.key}>
                  {setting.label}: {` `}
                  {setting.dataType === 'array'
                    ? getArrayValueHTML(pokemon[setting.key])
                    : pokemon[setting.key]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
  return content;
};

export default React.memo(Pokemon);
