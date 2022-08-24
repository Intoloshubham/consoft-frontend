const myProfile = {
  name: 'ByProgrammers',
  profile_image: require('../assets/images/profile.png'),
  address: 'No. 88, Jln Padungan, Kuching',
};

const reports = [
  { id: 1, name: 'Quality' },
  { id: 2, name: 'Quantity' },
  { id: 3, name: 'Stock keeper' },
  { id: 4, name: 'Other' },
];

const categories = [
  {
    id: 1,
    name: 'Fast Food',
    icon: require('../assets/icons/burger.png'),
  },
  {
    id: 2,
    name: 'Fruit Item',
    icon: require('../assets/icons/cherry.png'),
  },
  {
    id: 3,
    name: 'Rice Item',
    icon: require('../assets/icons/rice.png'),
  },
];
const Active_tasks = [
  {
    id: 1,
    name: 'Task 1',
    icon: require('../assets/icons/active_task.png'),
  },
  {
    id: 2,
    name: 'Task 2',
    icon: require('../assets/icons/active_task.png'),
  },
  {
    id: 3,
    name: 'task 3',
    icon: require('../assets/icons/active_task.png'),
  },
  {
    id: 4,
    name: 'task 4',
    icon: require('../assets/icons/active_task.png'),
  },
  {
    id: 5,
    name: 'task 5',
    icon: require('../assets/icons/active_task.png'),
  },
];

const barData = [
  {
    work: '',
    date: '10/05/2021',
    code: '1050',
    count: 0
  },
  {
    work: '',
    date: '11/05/2021',
    code: '1051',
    count: 0
  },
  {
    work: '',
    date: '12/05/2021',
    code: '1052',
    count: 0 
  },
  {
    work: '',
    date: '13/05/2021',
    code: '1053',
    count: 0 
  },
  {
    work: '',
    date: '14/05/2021',
    code: '1055',
    count: 0
  },
  {
    work: '',
    date: '14/05/2021',
    code: '1056',
    count: 0
  },
];

const comp_tasks_var = [
  {
    id: 1,
    name: 'Task 1',
    icon: require('../assets/icons/completed.png'),
  },
  {
    id: 2,
    name: 'Task 2',
    icon: require('../assets/icons/completed.png'),
  },
  {
    id: 3,
    name: 'Task 3',
    icon: require('../assets/icons/completed.png'),
  },
  {
    id: 4,
    name: 'Task 4',
    icon: require('../assets/icons/completed.png'),
  },
];
const Reports_part = [
  {
    id: 1,
    name: 'Ram, {Manager}',
    // icon: require("../assets/icons/completed.png")
  },
  {
    id: 2,
    name: 'Shyam, {Editor}',
    // icon: require("../assets/icons/completed.png")
  },
  {
    id: 3,
    name: 'Aman, {Supervisor}',
    // icon: require("../assets/icons/completed.png")
  },
  // {
  //   id: 4,
  //   name: "Contractor's Labour",
  //   // icon: require("../assets/icons/completed.png")
  // },
];

const Cost = {
  id: 1,
  name: 'Cost',
  description: 'Chicken patty hamburger',
  categories: [1, 2],
  price: 15.99,
  calories: 78,
  isFavourite: true,
  image: require('../assets/dummyData/hamburger.png'),
};

const Timeline = {
  id: 2,
  name: 'Timeline',
  description: 'Mexican tortilla & tacos',
  categories: [1, 3],
  price: 10.99,
  calories: 78,
  isFavourite: false,
  image: require('../assets/dummyData/hot_tacos.png'),
};

const Stock = {
  id: 3,
  name: 'Stock',
  description: 'Indian Vegetable Biryani',
  categories: [1, 2, 3],
  price: 10.99,
  calories: 78,
  isFavourite: true,
  image: require('../assets/dummyData/veg_biryani.png'),
};

const Manpower = {
  id: 4,
  name: 'Manpower',
  description: 'Grilled vegetables sandwich',
  categories: [1, 2],
  price: 10.99,
  calories: 78,
  isFavourite: true,
  image: require('../assets/dummyData/wrap_sandwich.png'),
};

const Quality = {
  id: 5,
  name: 'Quality',
  description: 'Grilled vegetables sandwich',
  categories: [1, 2],
  price: 10.99,
  calories: 78,
  isFavourite: true,
  image: require('../assets/dummyData/wrap_sandwich.png'),
};

const Safety = {
  id: 6,
  name: 'Safety',
  description: 'Grilled vegetables sandwich',
  categories: [1, 2],
  price: 10.99,
  calories: 78,
  isFavourite: true,
  image: require('../assets/dummyData/wrap_sandwich.png'),
};

const Technical = {
  id: 7,
  name: 'Technical',
  description: 'Grilled vegetables sandwich',
  categories: [1, 2],
  price: 10.99,
  calories: 78,
  isFavourite: true,
  image: require('../assets/dummyData/wrap_sandwich.png'),
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
  myProfile,
  categories,
  menu,
  reports,
  Active_tasks,
  comp_tasks_var,
  Reports_part,
  barData,
};
