// Created by Yugal Lohani - React Add to Cart
import React from 'react';

const ProductItem = ({ product, addToCart }) => {
  return (
    <div className="product-item">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">₹{product.price.toFixed(2)}</p>
      <button onClick={() => addToCart(product)} className="add-to-cart-btn">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
