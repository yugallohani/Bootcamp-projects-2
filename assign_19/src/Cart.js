// Created by Yugal Lohani - React Add to Cart
import React from 'react';

const Cart = ({ cartItems, updateQuantity, removeFromCart }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart">
      <h2>My Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p>₹{item.price.toFixed(2)}</p>
              </div>
              <div className="cart-controls">
                <button onClick={() => updateQuantity(item.id, -1)} className="quantity-btn">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="quantity-btn">+</button>
                <button onClick={() => removeFromCart(item.id)} className="remove-btn">×</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ₹{calculateTotal()}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
