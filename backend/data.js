import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Nico Jay',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Nicks',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Ultrasonic Blind stick',
      slug: 'ultrasonic-blind-tick',
      category: 'Blindstick',
      image: '/images/blindstick1.jpg', // 679px × 829px
      price: 8700,
      countInStock: 10,
      brand: 'BANN',
      rating: 4.5,
      numReviews: 10,
      description: 'Ultrasonic blind stick for visually impaired people.',
    },
    {
      name: 'Foldable Blind stick',
      slug: 'foldable-blind-tick',
      category: 'Blindstick',
      image: '/images/blindstick2.jpg', // 679px × 829px
      price: 3700,
      countInStock: 0,
      brand: 'BANN',
      rating: 4,
      numReviews: 10,
      description: 'foldable blind stick for visually impaired people.',
    },
    {
      name: 'Simple Blind stick',
      slug: 'cane-blind-tick',
      category: 'Blindstick',
      image: '/images/blindstick3.jpeg', // 679px × 829px
      price: 1100,
      countInStock: 10,
      brand: 'BANN',
      rating: 3.5,
      numReviews: 10,
      description: 'Simple blind stick for visually impaired people.',
    },
    {
      name: 'Wooden Blind stick',
      slug: 'wooden-blind-tick',
      category: 'Blindstick',
      image: '/images/blindstick4.jpg', // 679px × 829px
      price: 750,
      countInStock: 10,
      brand: 'BANN',
      rating: 3.5,
      numReviews: 10,
      description: 'Simple blind stick for visually impaired people.',
    },
  ],
};
export default data;
