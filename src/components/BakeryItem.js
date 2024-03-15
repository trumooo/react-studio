import { useState } from "react";

// Assuming addToCart is passed as a prop
function BakeryItem({ item, index, addToCart }) {
    const [count, setCount] = useState(0);

    return (
        <div>
            <img src={item.image} alt={item.description} width="300"></img>
            <p>{item.name}</p>
            <button onClick={() => {
                setCount(count + 1);
                addToCart(item.name, count + 1);
            }}>
                Add To Cart
            </button>
        </div>
    );
}

export default BakeryItem;
