// src/components/TableInput.js

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TableInput = ({ setTableNumber }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setTableNumber(input);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="table-input"
    >
      <form onSubmit={handleSubmit} className="table-input-form">
        <h2>Welcome to Our Restaurant!</h2>
        <p>Please enter your table number to start ordering</p>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Table Number"
          required
          className="table-number-input"
        />
        <button type="submit" className="start-button">Start Ordering</button>
      </form>
    </motion.div>
  );
};

export default TableInput;