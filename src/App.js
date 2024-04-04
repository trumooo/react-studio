import React, { useState, useEffect } from "react";
import "./App.css";
import honeyData from "./assets/honey-data.json"; 
import HoneyItem from "./components/HoneyItem"; 

function App() {
  const [isOrganic, setIsOrganic] = useState(false);
  const [stateFilter, setStateFilter] = useState("All");
  const [pairingFilter, setPairingFilter] = useState("All");
  const [sortBy, setSortBy] = useState("None");
  const [cart, setCart] = useState({});
  const [displayedItems, setDisplayedItems] = useState([]);
  //remove one from cart count 
  const removeFromCart = (honey) => {

    setCart((currentCart) => {
        const updatedCart = { ...currentCart };
        const honeyName = honey.companyName;

        if (updatedCart[honeyName]) {
            if (updatedCart[honeyName].count > 1) {
                updatedCart[honeyName].count -= 1;
            } else {
              //if removing makes it zero
                delete updatedCart[honeyName];
            }
        }
        return updatedCart;
    });
};

//filtering effects
  useEffect(() => {
    let updatedItems = honeyData
      .filter(honey => isOrganic ? honey.organic : true)
      .filter(honey => stateFilter === "All" || honey.stateOfOrigin === stateFilter)
      .filter(honey => pairingFilter === "All" || honey.paring === pairingFilter);
    
      //sorting effects

    switch (sortBy) {
      case "DollarsAsc":
        updatedItems.sort((a, b) => a.price - b.price);
        break;
      case "DollarsDesc":
        updatedItems.sort((a, b) => b.price - a.price);
        break;
      case "OzAsc":
        updatedItems.sort((a, b) => a.ounces - b.ounces);
        break;
      case "OzDesc":
        updatedItems.sort((a, b) => b.ounces - a.ounces);
        break;
      
    }

    setDisplayedItems(updatedItems);
  }, [isOrganic, stateFilter, pairingFilter, sortBy]);

//the cart
  const addToCart = (honey) => {
    setCart((currentCart) => {
      const honeyName = honey.companyName; 
      const updatedCart = { ...currentCart };
      if (!updatedCart[honeyName]) {
        updatedCart[honeyName] = { ...honey, count: 1 };
      } else {
        updatedCart[honeyName].count += 1;
      }
      return updatedCart;
    });
  };

  //this is just the default settings for the filters
  const resetFilters = () => {
    setIsOrganic(false);
    setStateFilter("All");
    setPairingFilter("All");
    setSortBy("None");
  };

//total price in cart
  const sum = Object.values(cart).reduce((total, honey) => total + honey.count * honey.price, 0);

  return (
    //this is the website's html
    <div className="App">
      <div className="body">
      <div className="header1">
      <h1>Our Honey Selection</h1>
      </div>

      <div className="honey-items">
       {displayedItems.map((honey, index) => (
          <HoneyItem key={index} honey={honey} addToCart={addToCart} removeFromCart={removeFromCart} />
        ))}
        </div>
      </div>
      <div className="filters">
        <div className="filter-buffer">
          <h2>Filter Results</h2>
          <div className="body-filter"> 
            <div className="filter-space">
          <label htmlFor="organicFilter">Organic Only:</label>
          <input
            type="checkbox"
            id="organicFilter"
            checked={isOrganic}
            onChange={(e) => setIsOrganic(e.target.checked)}
          />
          </div>
          <div className="filter-space">
          <label htmlFor="stateFilter">State of Origin:</label>
          <select id="stateFilter" value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
            <option value="All">All States</option>
            <option value="California">California</option>
            <option value="Colorado">Colorado</option>
            <option value="Delaware">Delaware</option>
            <option value="Florida">Florida</option>
            <option value="Georgia">Georgia</option>
            <option value="New York">New York</option>
            <option value="Texas">Texas</option>
            <option value="Vermont">Vermont</option>
          </select>
          </div>
          
          <div className="filter-space">

          <label htmlFor="pairingFilter">Pairing:</label>
          <select id="pairingFilter" value={pairingFilter} onChange={(e) => setPairingFilter(e.target.value)}>
            <option value="All">All Pairings</option>
            <option value="tea">Tea</option>
            <option value="coffee">Coffee</option>
            <option value="sandwiches">Sandwiches</option>
            <option value="baking">Baking</option>
            <option value="oatmeal">Oatmeal</option>
          </select>
          </div>            <div className="filter-space">

          
          <label htmlFor="sort">Sort By:</label>
          <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="None">Select</option>
            <option value="DollarsAsc">Price (Low to High)</option>
            <option value="DollarsDesc">Price (High to Low)</option>
            <option value="OzAsc">Ounces (Low to High)</option>
            <option value="OzDesc">Ounces (High to Low)</option>
          </select>
          </div>
          </div>
        </div>
        <button onClick={resetFilters}>Reset Filters</button>
      </div>

      <div className="cart">
        <h2 className="title">Cart</h2>
        {Object.entries(cart).map(([honeyName, itemDetails], index) => (
          <div className="items" key={index}>
                        <img src={itemDetails.image} alt={`${itemDetails.companyName} honey`} style={{ width: '60px', height: '50px'}}/> {honeyName}: {itemDetails.count} x ${itemDetails.price} ({itemDetails.ounces} oz)
          </div>
        ))}
        <div className="total">Total: ${sum.toFixed(2)}</div>
        <div className="checkoutbox"> <a> Checkout </a></div>
      </div>

    </div>
  );
}

export default App;
