// Created by Yugal Lohani - React Add to Cart
import React, { useState } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';
import './styles.css';

// --- Product Data ---
const initialProducts = [
  { id: 1, name: 'Masala Chai', price: 50, image: 'https://placehold.co/300x200/d35400/white?text=Masala+Chai' },
  { id: 2, name: 'Samosa (2 pcs)', price: 40, image: 'https://placehold.co/300x200/e67e22/white?text=Samosa' },
  { id: 3, name: 'Jalebi (100g)', price: 80, image: 'https://placehold.co/300x200/f39c12/white?text=Jalebi' },
  { id: 4, name: 'Mango Lassi', price: 120, image: 'https://placehold.co/300x200/f1c40f/white?text=Mango+Lassi' },
  { id: 5, name: 'Paneer Tikka', price: 180, image: 'https://placehold.co/300x200/c0392b/white?text=Paneer+Tikka' },
  { id: 6, name: 'Gulab Jamun (2 pcs)', price: 60, image: 'https://placehold.co/300x200/8e44ad/white?text=Gulab+Jamun' },
];

function App() {
  const [products] = useState(initialProducts);
  const [cartItems, setCartItems] = useState([]);

  // --- Add to Cart Logic ---
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemInCart = prevItems.find((item) => item.id === product.id);
      if (itemInCart) {
        // If item exists, update its quantity
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If item doesn't exist, add it to the cart with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // --- Update Quantity Logic ---
  const updateQuantity = (productId, amount) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + amount;
          // If new quantity is 0 or less, filter it out later
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(item => item !== null); // Remove items that were set to null
    });
  };
  
  // --- Remove from Cart Logic ---
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };


  return (
    <div className="app-container">
      <section className="products-section">
        <h1>Indian Delights</h1>
        <ProductList products={products} addToCart={addToCart} />
      </section>
      <section className="cart-section">
        <Cart 
          cartItems={cartItems} 
          updateQuantity={updateQuantity} 
          removeFromCart={removeFromCart} 
        />
      </section>
    </div>
  );
}

export default App;
