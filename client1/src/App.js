import React, { useState } from 'react';
import TableInput from './components/TableInput';
import Menu from './components/Menu';
import Cart from './components/Cart';

const App = () => {
  const [tableNumber, setTableNumber] = useState(null);
  const [cart, setCart] = useState([]);

  const addToCart = (dish) => {
    setCart([...cart, dish]);
  };

  return (
    <div className="app">
      {!tableNumber ? (
        <TableInput setTableNumber={setTableNumber} />
      ) : (
        <>
          <Menu addToCart={addToCart} cart={cart} tableNumber={tableNumber} />
          <Cart cart={cart} />
        </>
      )}
    </div>
  );
};

export default App;