import React from 'react';
import './Filters.css';

const Filters = props => {
  const getOptionsHTML = options => {
    return options.map(option => (
      <option value={option.value} key={option.label}>
        {option.label}
      </option>
    ));
  };
  const heightOptions = getOptionsHTML(props.heightOptions);
  const weaknessOptions = getOptionsHTML(props.weaknessOptions);

  const optionSettigns = [
    {
      inputType: 'text',
      label: 'Search by type or name',
      name: 'text-search',
      onChange: $event => props.onSearchTextChange($event),
      value: props.searchText
    },
    {
      inputType: 'select',
      label: 'Weakness',
      name: 'weakness',
      onChange: $event => props.onWeaknessSelect($event),
      value: props.selectedWeakness,
      options: weaknessOptions
    },
    {
      inputType: 'select',
      label: 'Height',
      name: 'height',
      onChange: $event => props.onHeightSelect($event),
      value: props.selectedHeight,
      options: heightOptions
    }
  ];

  const textInput = setting => (
    <div key={setting.name} className="mr4">
      <label htmlFor={setting.name} className="mr2">
        {setting.label}
      </label>
      <input
        type={setting.type}
        name={setting.name}
        onChange={setting.onChange}
      />
    </div>
  );

  const selectInput = setting => (
    <div key={setting.name} className="mr4">
      <label htmlFor={setting.name} className="mr2">
        {setting.label}
      </label>
      <select
        name={setting.name}
        onChange={setting.onChange}
        value={setting.value}
      >
        {setting.options}
      </select>
    </div>
  );

  const content = (
    <div className="flex justify-center items-baseline mb4 filter-container">
      {optionSettigns.map(setting => {
        return setting.inputType === 'text'
          ? textInput(setting)
          : selectInput(setting);
      })}
      <button
        onClick={props.onClearAllClick}
        className="f6 link br1 ph3 pv2 mb2 dib white button"
      >
        Clear All
      </button>
    </div>
  );
  return content;
};

export default React.memo(Filters);
