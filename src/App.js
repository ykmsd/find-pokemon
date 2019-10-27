import React, { useState, useEffect } from 'react';
import './App.css';
import Filters from './Filters/Filters';
import Pokemon from './Pokemon/Pokemon';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);
  const [matchedPokemon, setMatchedPokemon] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedWeakness, setSelectedWeakness] = useState('');
  const [selectedHeight, setSelectedHeight] = useState('');
  const [weaknessOptions, setWeaknessOptions] = useState([]);
  const [heightOptions, setHeightOptions] = useState([]);

  const getMatchedPokemon = fetchedPokemon => {
    return fetchedPokemon.filter(pokemon => {
      const isTextMatchedPokemon =
        pokemon.type.map(type => type.toLowerCase()).includes(searchText) ||
        pokemon.name.toLowerCase().includes(searchText);

      if (!isTextMatchedPokemon) {
        return false;
      }
      /** Return everything if no weakness and height fitler */
      if (!selectedWeakness && !selectedHeight) {
        return true;
      }
      /** Return matched two criteria if both filteres are selected */
      if (selectedWeakness && selectedHeight) {
        return (
          pokemon.weaknesses.includes(selectedWeakness) &&
          pokemon.height === selectedHeight
        );
      }
      return (
        pokemon.weaknesses.includes(selectedWeakness) ||
        pokemon.height === selectedHeight
      );
    });
  };

  const getSelectOptions = (items, key) => {
    const values = items
      .map(item => item[key])
      .flat()
      .sort();

    const uniqueValues = [...new Set(values)];
    return [
      { label: 'All', value: '' },
      ...uniqueValues.map(
        value => ({
          label: value,
          value: value
        }),
        []
      )
    ];
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(
      'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json'
    )
      .then(response => {
        return response.json();
      })
      .then(({ pokemon }) => {
        setIsLoading(false);
        setFetchedData(pokemon);
        setWeaknessOptions(getSelectOptions(pokemon, 'weaknesses'));
        setHeightOptions(getSelectOptions(pokemon, 'height'));
        setMatchedPokemon(getMatchedPokemon(pokemon));
      });
  }, []);

  useEffect(() => {
    if (fetchedData) {
      setMatchedPokemon(getMatchedPokemon(fetchedData));
    }
  }, [searchText, selectedWeakness, selectedHeight]);

  const searchTextChangeHandler = ({ target: { value } }) => {
    setSearchText(value.toLowerCase());
  };

  const weaknessSelectHandler = ({ target: { value } }) => {
    setSelectedWeakness(value);
  };

  const heightSelectHandler = ({ target: { value } }) => {
    setSelectedHeight(value);
  };

  const clearAllHandler = () => {
    setSearchText('');
    setSelectedWeakness('');
    setSelectedHeight('');
  };

  const content = (
    <div className="container">
      <h1 className="f1 lh-title tc mb4">Find your Pokémon 🔎</h1>
      <Filters
        weaknessOptions={weaknessOptions}
        heightOptions={heightOptions}
        selectedHeight={selectedHeight}
        selectedWeakness={selectedWeakness}
        onSearchTextChange={searchTextChangeHandler}
        onWeaknessSelect={weaknessSelectHandler}
        onHeightSelect={heightSelectHandler}
        onClearAllClick={clearAllHandler}
      />
      <Pokemon matchedPokemon={matchedPokemon} />
    </div>
  );
  return content;
};

export default App;
