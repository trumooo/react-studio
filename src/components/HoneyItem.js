import { useState } from "react";

function HoneyItem({ item, addToCart, removeFromCart }) {
    const [count, setCount] = useState(0);

    return (
        <div className="honey-item">
            <img src={item.image} alt={`${item.companyName} honey`} style={{ width: '300px', height: '200px' }}/>
            <h3>{item.companyName}</h3>
            <p>Origin: {item.stateOfOrigin}</p>
            <p>Price: ${item.price} - {item.ounces} oz</p>
            <p>Pairs well with: {item.paring}</p>
            <p>{item.organic ? "Organic" : "Non-Organic"}</p>
            <button className="add" onClick={() => {
                setCount(count + 1);
                // Adjusted to pass the whole item object to addToCart
                addToCart({...item, count: count + 1});
            }}>
                +
            </button>
            {/* New button for removing from cart */}
        <button className="remove" onClick={() => removeFromCart(item)}>
           -
        </button>
        </div>
    );
}

export default HoneyItem;
