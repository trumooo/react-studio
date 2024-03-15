import "./App.css";
import { useState } from "react";
import bakeryData from "./assets/bakery-data.json";
import button from "./components/Button";
import BakeryItem from "./components/BakeryItem";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  const [cart, setCart] = useState({});

  const addToCart = (item) => {
    setCart((currentCart) => {
      const itemName = item.name; // Assuming item names are unique
      const updatedCart = { ...currentCart };
      if (!newCart[itemName]) {
        updatedCart[itemName] = { count: 1, price: item.price, name: item.name }; // Store name as well
      } else {
        updatedCart[itemName].count += 1;
      }
      return updatedCart;
    });
  };

  // Calculate total price
  const sum = Object.values(cart).reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);

  return (
    <div className="App">
      <h1>My Bakery</h1>
      {bakeryData.map((item, index) => (
        <BakeryItem key={index} item={item} addToCart={() => addToCart(item)} />
      ))}
      <div className="cart">
        <h2>Cart</h2>
        {Object.entries(cart).map(([itemName, itemDetails], index) => (
          <div key={index}>
            {itemName}: {itemDetails.count} x ${itemDetails.price}
          </div>
        ))}
        <div>Total: ${sum.toFixed(2)}</div>
      </div>
    </div>
  );
}

export default App;