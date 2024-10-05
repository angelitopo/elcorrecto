// client/src/components/Menu.js
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import dishesData from './dishesData';
import axios from 'axios';

const Menu = ({ addToCart, cart, tableNumber }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [checkoutId, setCheckoutId] = useState(null);

  const categories = ['All', ...new Set(dishesData.map((dish) => dish.category))];

  const filteredDishes = dishesData.filter(
    (dish) =>
      dish.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || dish.category === selectedCategory)
  );

  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/orders`,
        {
          tableNumber,
          items: cart,
          total: cart.reduce((acc, item) => acc + item.price, 0),
        }
      );

      const { id: orderId, total } = orderResponse.data;

      const paymentResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/payments`,
        {
          orderId,
          total,
        }
      );

      setCheckoutId(paymentResponse.data.checkoutId);
    } catch (error) {
      console.error('Payment failed', error);
    }
  };

  useEffect(() => {
    if (checkoutId) {
      const script = document.createElement('script');
      script.src = 'https://gateway.sumup.com/gateway/ecom/card/v2/sdk.js';
      script.async = true;
      script.onload = () => {
        window.SumUpCard.mount({
          id: 'sumup-card',
          checkoutId,
          onResponse: function (type, body) {
            console.log('Type:', type);
            console.log('Body:', body);
            if (type === 'success') {
              alert('Payment successful!');
            } else if (type === 'error' || type === 'fail') {
              alert('Payment failed. Please try again.');
            }
          },
        });
      };
      document.body.appendChild(script);
    }
  }, [checkoutId]);

  return (
    <div className="menu">
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search dishes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="categories">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category ? 'active-category' : 'category-button'
              }
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="dishes">
        {filteredDishes.map((dish) => (
          <div key={dish.id} className="dish-card">
            <img src={dish.image} alt={dish.name} className="dish-image" />
            <h3 className="dish-name">{dish.name}</h3>
            <p className="dish-description">{dish.description}</p>
            <div className="dish-footer">
              <span className="dish-price">£{dish.price.toFixed(2)}</span>
              <button onClick={() => addToCart(dish)} className="add-button">Add</button>
            </div>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div className="cart-footer">
          <button onClick={handlePayment} className="pay-button">
            Pay Now (£{cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)})
          </button>
        </div>
      )}
      {checkoutId && <div id="sumup-card"></div>}
    </div>
  );
};

export default Menu;
