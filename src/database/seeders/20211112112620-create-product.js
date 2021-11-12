export default {
  up: queryInterface => queryInterface.bulkInsert('Products', [{
    title: 'Flesh Meat',
    description: 'Flesh cow meat without bones.',
    img_url: 'https://res.cloudinary.com/alexander-prince/image/upload/v1636715954/1636715951845.png',
    unit_price: 3800,
  },
  {
    title: 'Bone Meat',
    description: 'Cow meat with bones.',
    img_url: 'https://res.cloudinary.com/alexander-prince/image/upload/v1636716030/1636716029217.jpg',
    unit_price: 3000,
  },
  {
    title: 'Chicken',
    description: 'Whole chicken meat.',
    img_url: 'https://res.cloudinary.com/alexander-prince/image/upload/v1636716108/1636716105806.png',
    unit_price: 5000,
  },
  {
    title: 'Fish',
    description: 'Fresh fish (Fillet/Tilapia).',
    img_url: 'https://res.cloudinary.com/alexander-prince/image/upload/v1636716153/1636716151406.png',
    unit_price: 4000,
  }], {}),
  down: queryInterface => queryInterface.bulkDelete('Products', null, {})
};