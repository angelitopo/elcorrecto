// server/controllers/orderController.js

const Order = require('../models/Order');
const axios = require('axios');

exports.createOrder = async (req, res) => {
  try {
    const { tableNumber, items, total } = req.body;

    const order = new Order({
      tableNumber,
      items,
      total,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.processPayment = async (req, res) => {
  const { orderId, amount } = req.body;

  try {
    const response = await axios.post(
      'https://api.sumup.com/v0.1/checkouts',
      {
        amount,
        currency: 'GBP',
        checkout_reference: orderId,
        description: 'Restaurant Order',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SUMUP_ACCESS_TOKEN}`,
        },
      }
    );

    res.status(200).json({ redirect_url: response.data.checkout_url });
  } catch (error) {
    res.status(500).json({ message: 'Payment failed', error: error.message });
  }
};
