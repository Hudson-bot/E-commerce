import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useState({});
  const location = useLocation();

  // Reload cart every time the route changes (on page load and navigation)
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
    else setCart({});
  }, [location]);

  const increaseQty = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: {
        product: prevCart[productId].product,
        quantity: prevCart[productId].quantity + 1,
      },
    }));
  };

  const decreaseQty = (productId) => {
    setCart((prevCart) => {
      const currentQty = prevCart[productId].quantity;
      if (currentQty <= 1) {
        const newCart = { ...prevCart };
        delete newCart[productId];
        return newCart;
      }
      return {
        ...prevCart,
        [productId]: {
          product: prevCart[productId].product,
          quantity: currentQty - 1,
        },
      };
    });
  };

  const removeItem = (productId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[productId];
      return newCart;
    });
  };

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const totalPrice = Object.values(cart).reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-purple-700 mb-8 text-center">Shopping Cart</h1>

      {Object.keys(cart).length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-6">
            {Object.values(cart).map(({ product, quantity }) => (
              <li
                key={product.id}
                className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-purple-700 font-bold text-lg">
                      ${product.price.toFixed(2)} × {quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => decreaseQty(product.id)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    aria-label={`Decrease quantity of ${product.name}`}
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{quantity}</span>
                  <button
                    onClick={() => increaseQty(product.id)}
                    className="px-3 py-1 bg-purple-700 text-white rounded hover:bg-purple-800"
                    aria-label={`Increase quantity of ${product.name}`}
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-red-600 hover:text-red-800 ml-4"
                    aria-label={`Remove ${product.name} from cart`}
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 text-right">
            <p className="text-2xl font-semibold mb-4">Total: ${totalPrice.toFixed(2)}</p>
            <button
              onClick={() => alert('Checkout feature not implemented')}
              className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
              Checkout
            </button>
          </div>
        </>
      )}

      <div className="mt-8 text-center">
        <Link
          to="/products"
          className="text-purple-600 hover:underline font-semibold"
        >
          &larr; Back to Products
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
