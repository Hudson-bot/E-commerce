import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const productsData = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 99.99,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Running Shoes',
    category: 'Footwear',
    price: 79.99,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Smart Watch',
    category: 'Electronics',
    price: 199.99,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'Leather Wallet',
    category: 'Accessories',
    price: 49.99,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 5,
    name: 'Sunglasses',
    category: 'Accessories',
    price: 29.99,
    image: 'https://via.placeholder.com/150',
  },
];

const categories = ['All', 'Electronics', 'Footwear', 'Accessories'];

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState({});

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = productsData.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const increaseQty = (product) => {
    setCart((prevCart) => {
      const currentQty = prevCart[product.id]?.quantity || 0;
      return {
        ...prevCart,
        [product.id]: {
          product,
          quantity: currentQty + 1,
        },
      };
    });
  };

  const decreaseQty = (product) => {
    setCart((prevCart) => {
      const currentQty = prevCart[product.id]?.quantity || 0;
      if (currentQty <= 1) {
        // Remove from cart if quantity goes to 0
        const newCart = { ...prevCart };
        delete newCart[product.id];
        return newCart;
      }
      return {
        ...prevCart,
        [product.id]: {
          product,
          quantity: currentQty - 1,
        },
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-700 mb-8 text-center">Our Products</h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-1/4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-600 col-span-full">No products found.</p>
          ) : (
            filteredProducts.map((product) => {
              const quantity = cart[product.id]?.quantity || 0;
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-32 h-32 object-cover mb-4 rounded-md"
                  />
                  <h3 className="text-lg font-semibold mb-2 text-center">{product.name}</h3>
                  <p className="text-purple-700 font-bold text-xl mb-4">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => decreaseQty(product)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                      disabled={quantity === 0}
                      aria-label={`Decrease quantity of ${product.name}`}
                    >
                      -
                    </button>
                    <span className="text-lg font-medium">{quantity}</span>
                    <button
                      onClick={() => increaseQty(product)}
                      className="px-3 py-1 bg-purple-700 text-white rounded hover:bg-purple-800"
                      aria-label={`Increase quantity of ${product.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Cart Page Link */}
        <div className="mt-10 text-center">
          <Link
            to="/cart"
            className="inline-block bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Go to Cart ({Object.values(cart).reduce((acc, i) => acc + i.quantity, 0)})
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
