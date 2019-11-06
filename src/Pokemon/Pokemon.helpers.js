export const detailSettings = [
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

export const getArrayValueHTML = array => {
  return array.join(', ');
};
