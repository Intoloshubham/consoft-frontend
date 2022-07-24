const categories = [
  {
    id: 1,
    name: 'Cost & Timeline',
  },
  {
    id: 2,
    name: 'Stock & Manpower',
  },
  {
    id: 3,
    name: 'Quality & Safety',
  },
  {
    id: 4,
    name: 'Technical',
  },
];

const Cost = {
  id: 1,
  name: 'Cost',
  categories: [1],
};
const Timeline = {
  id: 2,
  name: 'Timeline',
  categories: [1],
};
const Stock = {
  id: 3,
  name: 'Stock',
  categories: [2],
};
const Manpower = {
  id: 4,
  name: 'Manpower',
  categories: [2],
};
const Quality = {
  id: 5,
  name: 'Quality',
  categories: [3],
};
const Safety = {
  id: 6,
  name: 'Safety',
  categories: [3],
};
const Technical = {
  id: 7,
  name: 'Technical',
  categories: [4],
};

const menu = [
  {
    id: 1,
    name: 'Cost & Timeline',
    list: [Cost, Timeline],
  },
  {
    id: 2,
    name: 'Stock & Manpower',
    list: [Stock, Manpower],
  },
  {
    id: 3,
    name: 'Quality & Safety',
    list: [Quality, Safety],
  },
  {
    id: 4,
    name: 'Technical',
    list: [Technical],
  },
];

export default {
  menu,
  categories,
};
