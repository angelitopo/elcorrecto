// src/components/Cart.js

import React from 'react';

const Cart = ({ cart }) => {
  return (
    <div className="cart">
      <h1>Your Cart</h1>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - £{item.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;