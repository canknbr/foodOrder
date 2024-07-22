export const getDishById = (id: number) => {
  const meals = restaurant.food.flatMap((category) => category.meals);
  return meals.find((meal) => meal.id === id);
};
export const restaurant = {
  name: 'Dükkan Maradona',
  rating: '4.5 Mükemmel',
  ratings: '(500+)',
  img: require('@/assets/data/r1.jpeg'),
  distance: '0.85 km uzakta',
  delivery: '10-20 dk',
  tags: [
    'İtalyan',
    'Pizza',
    'Makarna',
    'Salata',
    'Vegan',
    'Alkol',
    'Şarap',
    'Vegan Dostu',
  ],
  about:
    'El yapımı taze makarna, ince hamurlu pizza, protein dolu salatalar, ev yapımı soslar. Makarna şeklinizi seçin ve istediğiniz ekstraları ekleyin.',
  food: [
    {
      category: 'Menüler',
      meals: [
        {
          id: 1,
          name: 'Makarna Ankara ✊',
          price: 17,
          info: 'Bir adet sarımsaklı ekmek, bir adet makarna ve bir adet meşrubat içermektedir.',
          img: require('@/assets/data/1.png'),
        },
        {
          id: 2,
          name: 'VeganThunberg 💚',
          price: 17,
          info: 'Bir adet sarımsaklı ekmek, bir adet makarna ve bir adet meşrubat içermektedir.',
          img: require('@/assets/data/2.png'),
        },
        {
          id: 3,
          name: 'Datça 💕',
          price: 40,
          info: 'Peynirli veya peynirsiz bir sarımsaklı ekmek, iki pizza seçeneği, bir şişe şarap veya dört şişe bira dahildir',
          img: require('@/assets/data/3.png'),
        },
        {
          id: 4,
          name: "Livin' Jovi 😎",
          price: 80,
          info: 'Peynirli veya peynirsiz iki sarımsaklı ekmek, dört pizza, iki şişe şarap veya sekiz şişe bira veya her ikisinin karışımını içerir',
          img: require('@/assets/data/4.png'),
        },
      ],
    },
    {
      category: 'Makarna',
      meals: [
        {
          id: 5,
          name: 'Arrabbiata',
          price: 9.35,
          info: 'Domates sosu, biber, sarımsak ve soğan',
          img: require('@/assets/data/5.png'),
        },
        {
          id: 6,
          name: 'Pomodoro e Mozzarella',
          price: 10.75,
          info: 'Domates sosu, biber, sarımsak ve soğan ve mozzarella',
          img: require('@/assets/data/6.png'),
        },
      ],
    },
    {
      category: 'Pizza',
      meals: [
        {
          id: 7,
          name: 'SalamSosis',
          price: 11.35,
          info: 'Baharatlı İtalyan sosisi, domates sosu, mozzarella peyniri',
          img: require('@/assets/data/7.png'),
        },
        {
          id: 8,
          name: 'Margarita',
          price: 9.75,
          info: 'Domates sosu, mozarella',
          img: require('@/assets/data/8.png'),
        },
      ],
    },
    {
      category: 'Salata',
      meals: [
        {
          id: 9,
          name: 'Mista',
          price: 5.99,
          info: 'Karışık yaprak salatası, çeri domates ve rendelenmiş havuç. Takas yapılamaz, ekstra eklemek isterseniz lütfen aşağıdan özelleştirin.',
          img: require('@/assets/data/9.png'),
        },
        {
          id: 10,
          name: 'Insalata della Casa',
          price: 8.95,
          info: 'Büyük karışık salata. Takas yapılamaz, ekstra eklemek isterseniz lütfen aşağıdan özelleştirin.',
          img: require('@/assets/data/10.png'),
        },
      ],
    },
    {
      category: 'Menüler',
      meals: [
        {
          id: 1,
          name: 'Makarna Ankara ✊',
          price: 17,
          info: 'Bir adet sarımsaklı ekmek, bir adet makarna ve bir adet meşrubat içermektedir.',
          img: require('@/assets/data/1.png'),
        },
        {
          id: 2,
          name: 'VeganThunberg 💚',
          price: 17,
          info: 'Bir adet sarımsaklı ekmek, bir adet makarna ve bir adet meşrubat içermektedir.',
          img: require('@/assets/data/2.png'),
        },
        {
          id: 3,
          name: 'Datça 💕',
          price: 40,
          info: 'Peynirli veya peynirsiz bir sarımsaklı ekmek, iki pizza seçeneği, bir şişe şarap veya dört şişe bira dahildir',
          img: require('@/assets/data/3.png'),
        },
        {
          id: 4,
          name: "Livin' Jovi 😎",
          price: 80,
          info: 'Peynirli veya peynirsiz iki sarımsaklı ekmek, dört pizza, iki şişe şarap veya sekiz şişe bira veya her ikisinin karışımını içerir',
          img: require('@/assets/data/4.png'),
        },
      ],
    },
    {
      category: 'Makarna',
      meals: [
        {
          id: 5,
          name: 'Arrabbiata',
          price: 9.35,
          info: 'Domates sosu, biber, sarımsak ve soğan',
          img: require('@/assets/data/5.png'),
        },
        {
          id: 6,
          name: 'Pomodoro e Mozzarella',
          price: 10.75,
          info: 'Domates sosu, biber, sarımsak ve soğan ve mozzarella',
          img: require('@/assets/data/6.png'),
        },
      ],
    },
    {
      category: 'Pizza',
      meals: [
        {
          id: 7,
          name: 'SalamSosis',
          price: 11.35,
          info: 'Baharatlı İtalyan sosisi, domates sosu, mozzarella peyniri',
          img: require('@/assets/data/7.png'),
        },
        {
          id: 8,
          name: 'Margarita',
          price: 9.75,
          info: 'Domates sosu, mozarella',
          img: require('@/assets/data/8.png'),
        },
      ],
    },
    {
      category: 'Salata',
      meals: [
        {
          id: 9,
          name: 'Mista',
          price: 5.99,
          info: 'Karışık yaprak salatası, çeri domates ve rendelenmiş havuç. Takas yapılamaz, ekstra eklemek isterseniz lütfen aşağıdan özelleştirin.',
          img: require('@/assets/data/9.png'),
        },
        {
          id: 10,
          name: 'Insalata della Casa',
          price: 8.95,
          info: 'Büyük karışık salata. Takas yapılamaz, ekstra eklemek isterseniz lütfen aşağıdan özelleştirin.',
          img: require('@/assets/data/10.png'),
        },
      ],
    },
  ],
};
