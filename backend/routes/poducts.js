const express = require('express');
const router = express.Router();

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 99.99,
    image: 'https://via.placeholder.com/150',
    description: 'High-quality wireless headphones with noise cancellation and 20 hours of battery life.',
  },
  {
    id: 2,
    name: 'Running Shoes',
    category: 'Footwear',
    price: 79.99,
    image: 'https://via.placeholder.com/150',
    description: 'Lightweight and breathable running shoes designed for comfort and performance.',
  },
  {
    id: 3,
    name: 'Smart Watch',
    category: 'Electronics',
    price: 149.99,
    image: 'https://via.placeholder.com/150',
    description: 'Fitness-focused smartwatch with heart rate tracking, GPS, and message notifications.',
  },
  {
    id: 4,
    name: 'Cotton T-Shirt',
    category: 'Clothing',
    price: 19.99,
    image: 'https://via.placeholder.com/150',
    description: 'Comfortable and stylish cotton t-shirt available in multiple colors and sizes.',
  },
  {
    id: 5,
    name: 'Gaming Mouse',
    category: 'Electronics',
    price: 59.99,
    image: 'https://via.placeholder.com/150',
    description: 'High-precision gaming mouse with customizable DPI settings and RGB lighting.',
  },
  {
    id: 6,
    name: 'Backpack',
    category: 'Accessories',
    price: 49.99,
    image: 'https://via.placeholder.com/150',
    description: 'Durable and spacious backpack ideal for school, travel, or daily use.',
  },
  {
    id: 7,
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    price: 39.99,
    image: 'https://via.placeholder.com/150',
    description: 'Portable Bluetooth speaker with deep bass and long-lasting battery.',
  },
  {
    id: 8,
    name: 'Yoga Mat',
    category: 'Fitness',
    price: 29.99,
    image: 'https://via.placeholder.com/150',
    description: 'Eco-friendly and non-slip yoga mat perfect for all types of yoga and workouts.',
  },
  {
    id: 9,
    name: 'Analog Wrist Watch',
    category: 'Accessories',
    price: 89.99,
    image: 'https://via.placeholder.com/150',
    description: 'Classic analog watch with leather strap and water-resistant design.',
  },
  {
    id: 10,
    name: 'Sunglasses',
    category: 'Accessories',
    price: 25.99,
    image: 'https://via.placeholder.com/150',
    description: 'UV-protected stylish sunglasses suitable for men and women.',
  }
];

router.get('/', (req, res) => {
  res.json(products);
});

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});


module.exports = router;
