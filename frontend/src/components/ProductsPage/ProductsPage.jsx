// src/components/ProductsPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext.jsx';

const categories = ['All', 'Electronics', 'Footwear', 'Accessories'];

const ProductsPage = () => {
  const [productsData, setProductsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { cart, addToCart, removeFromCart, cartCount } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        setProductsData(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = productsData.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openDialog = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto relative">
        <div className="absolute right-0 top-0 mt-2 mr-2 z-10">
          <Link
            to="/cart"
            className="inline-block bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 shadow"
          >
            Go to Cart ({cartCount})
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-purple-700 mb-8 text-center">Our Products</h1>

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
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-600 col-span-full">No products found.</p>
          ) : (
            filteredProducts.map((product) => {
              const quantity = cart[product.id]?.quantity || 0;
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer"
                  onClick={() => openDialog(product)}
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
                  <div
                    className="flex items-center space-x-4"
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (quantity > 0) removeFromCart(product.id);
                      }}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                      disabled={quantity === 0}
                    >
                      -
                    </button>
                    <span className="text-lg font-medium">{quantity}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="px-3 py-1 bg-purple-700 text-white rounded hover:bg-purple-800"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {dialogOpen && selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                onClick={closeDialog}
                aria-label="Close"
              >
                &times;
              </button>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-40 h-40 object-cover mx-auto mb-4 rounded"
              />
              <h2 className="text-2xl font-bold mb-2 text-center">{selectedProduct.name}</h2>
              <p className="text-purple-700 font-semibold text-lg mb-2 text-center">
                ${selectedProduct.price.toFixed(2)}
              </p>
              <p className="text-gray-700 mb-4 text-center">{selectedProduct.description}</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    const currentQty = cart[selectedProduct.id]?.quantity || 0;
                    if (currentQty > 0) removeFromCart(selectedProduct.id);
                  }}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  disabled={(cart[selectedProduct.id]?.quantity || 0) === 0}
                >
                  -
                </button>
                <span className="text-lg font-medium">
                  {cart[selectedProduct.id]?.quantity || 0}
                </span>
                <button
                  onClick={() => addToCart(selectedProduct)}
                  className="px-3 py-1 bg-purple-700 text-white rounded hover:bg-purple-800"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;