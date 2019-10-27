import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './Pokemon.css';

const Pokemon = props => {
  const detailSettings = [
    {
      label: 'Type',
      key: 'type',
      dataType: 'array'
    },
    {
      label: 'Height',
      key: 'height',
      dataType: 'string'
    },
    {
      label: 'Weakness',
      key: 'weaknesses',
      dataType: 'array'
    }
  ];

  const getArrayValueHTML = array => {
    return array.join(', ');
  };

  const content = (
    <div className="grid">
      {props.matchedPokemon.map(pokemon => (
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
                <li key={setting.name}>
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
