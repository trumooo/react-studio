import { useState } from "react";

function HoneyItem({ honey, addToCart, removeFromCart }) {
    const [count, setCount] = useState(0);

    return (
        <div className="honey-item">
            <img src={honey.image} alt={`${honey.companyName} honey`} style={{ width: '300px', height: '200px' }}/>
            <h3>{honey.companyName}</h3>

            <p>Origin: {honey.stateOfOrigin}</p>
            <p>Price: ${honey.price} - {honey.ounces} oz</p>
            <p>Pairs well with: {honey.paring}</p>
            <p>{honey.organic ? "Organic" : "Non-Organic"}</p>

            <button className="add" onClick={() => {
                setCount(count + 1);
                addToCart({...honey, count: count + 1});
            }}>
                +
            </button>
        <button className="remove" onClick={() => removeFromCart(honey)}>
           -
        </button>
        </div>
    );
}

export default HoneyItem;
