
const myProfile = {
    name: "ByProgrammers",
    profile_image: require("../assets/images/profile.png"),
    address: "No. 88, Jln Padungan, Kuching"
}

const reports = [
    { id: 1, name: 'Quality' },
    { id: 2, name: 'Quantity' },
    { id: 3, name: 'Stock keeper' },
    { id: 4, name: 'Other' }
]

const categories = [
    {
        id: 1,
        name: "Fast Food",
        icon: require("../assets/icons/burger.png")
    },
    {
        id: 2,
        name: "Fruit Item",
        icon: require("../assets/icons/cherry.png")
    },
    {
        id: 3,
        name: "Rice Item",
        icon: require("../assets/icons/rice.png")
    }
]
const Active_tasks = [
    {
        id: 1,
        name: "Task 1",
        icon: require("../assets/icons/active_task.png")
    },
    {
        id: 2,
        name: "Task 2",
        icon: require("../assets/icons/active_task.png")
    }
    ,
    {
        id: 3,
        name: "task 3",
        icon: require("../assets/icons/active_task.png")
    }
    ,
    {
        id: 4,
        name: "task 4",
        icon: require("../assets/icons/active_task.png")
    }
    ,
    {
        id: 5,
        name: "task 5",
        icon: require("../assets/icons/active_task.png")
    }
]

const barData = [
    {
        label: 0,
        value: 100,
        date: '10/05/2021',
        code: '1050'
    },
    {
        label: 1,
        value: 10, 
        date: '11/05/2021',
        code: '1051'
    },
    {
        label: 2,
        value: 40,
        date: '12/05/2021',
        code: '1052'
    },
    {
        label: 3,
        value: 50,
        date: '13/05/2021',
        code: '1053'
    },
    {
        label: 4,
        value: 60,
        date: '14/05/2021',
        code: '1055'
    },
    {
        label: 5,
        value: 75,
        date: '14/05/2021',
        code: '1056'
    },
]

const comp_tasks_var = [
    {
        id: 1,
        name: "Task 1",
        icon: require("../assets/icons/completed.png")
    },
    {
        id: 2,
        name: "Task 2",
        icon: require("../assets/icons/completed.png")
    },
    {
        id: 3,
        name: "Task 3",
        icon: require("../assets/icons/completed.png")
    },
    {
        id: 4,
        name: "Task 4",
        icon: require("../assets/icons/completed.png")
    }

]
const Reports_part = [
    {
        id: 1,
        name: "Company Team",
        // icon: require("../assets/icons/completed.png")
    },
    {
        id: 2,
        name: "Project Team",
        // icon: require("../assets/icons/completed.png")
    },
    {
        id: 3,
        name: "Contractor Team",
        // icon: require("../assets/icons/completed.png")
    },
    {
        id: 4,
        name: "Contractor's Labour",
        // icon: require("../assets/icons/completed.png")
    }

]


const hamburger = {
    id: 1,
    name: "Hamburger",
    description: "Chicken patty hamburger",
    categories: [1, 2],
    price: 15.99,
    calories: 78,
    isFavourite: true,
    image: require("../assets/dummyData/hamburger.png")
}

const hotTacos = {
    id: 2,
    name: "Hot Tacos",
    description: "Mexican tortilla & tacos",
    categories: [1, 3],
    price: 10.99,
    calories: 78,
    isFavourite: false,
    image: require("../assets/dummyData/hot_tacos.png")
}

const vegBiryani = {
    id: 3,
    name: "Veg Biryani",
    description: "Indian Vegetable Biryani",
    categories: [1, 2, 3],
    price: 10.99,
    calories: 78,
    isFavourite: true,
    image: require("../assets/dummyData/veg_biryani.png")
}

const wrapSandwich = {
    id: 4,
    name: "Wrap Sandwich",
    description: "Grilled vegetables sandwich",
    categories: [1, 2],
    price: 10.99,
    calories: 78,
    isFavourite: true,
    image: require("../assets/dummyData/wrap_sandwich.png")
}

const menu = [
    {
        id: 1,
        name: "Featured",
        list: [
            hamburger, hotTacos, vegBiryani,
        ]
    },
    {
        id: 2,
        name: "Nearby you",
        list: [
            hamburger, vegBiryani, wrapSandwich,
        ]
    },
    {
        id: 3,
        name: "Popular",
        list: [
            hamburger, hotTacos, wrapSandwich,
        ]
    },
    {
        id: 4,
        name: "Newest",
        list: [
            hamburger, hotTacos, vegBiryani,
        ]
    },
    {
        id: 5,
        name: "Trending",
        list: [
            hamburger, vegBiryani, wrapSandwich,
        ]
    },
    {
        id: 6,
        name: "Recommended",
        list: [
            hamburger, hotTacos, wrapSandwich,
        ]
    },

]


export default {
    myProfile,
    categories,
    menu,
    reports,
    Active_tasks,
    comp_tasks_var,
    Reports_part,
    barData
}