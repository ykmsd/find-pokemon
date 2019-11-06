import React from 'react';

export const getOptionsHTML = options => {
  return options.map(option => (
    <option value={option.value} key={option.label}>
      {option.label}
    </option>
  ));
};
