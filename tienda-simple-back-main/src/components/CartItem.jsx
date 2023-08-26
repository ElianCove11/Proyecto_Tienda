import { useCart } from "../context/CartContext";
import { host } from "../utils";
import "./CartItem.css";

function CartItem({ item }) {
  const { dispatch } = useCart();

  const handleRemoveFromCart = () => {
    fetch(`${host}/api/cart/${item.product.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        
        dispatch({ type: "REMOVE_FROM_CART", payload: item.product.id });
      }
    });
  };
  

  const handleIncreaseQuantity = async () => {
    console.log(item.id);
    fetch(`${host}/api/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        product_id: item.product.id,
        quantity: item.quantity + 1,
      }),
    }).then(async (response) => {
      if (response.ok) {
        
        dispatch({ type: "INCREASE_QUANTITY", payload: item.product.id });
      }
    });

    
  };

  const handleDecreaseQuantity = () => {
    fetch(`${host}/api/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        product_id: item.product.id,
        quantity: item.quantity - 1,
      }),
    }).then(async (response) => {
      if (response.ok) {
        
        dispatch({ type: "DECREASE_QUANTITY", payload: item.product.id });
      }
    });
  };

  return (
    <div className="cart-item">
      <img className="item-image" src={`${host}${item.product.url_image}`} alt={item.product.name} />
     
      <div className="item-info">
        <h3>{item.product.name}</h3>
        <p>${item.product.price.toFixed(2)}</p>
      </div>
      <div className="item-controls">
        <button onClick={handleIncreaseQuantity}>+</button>
        <span>{item.quantity}</span>
        <button onClick={handleDecreaseQuantity}>-</button>
        <button className="remove-button" onClick={handleRemoveFromCart}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default CartItem;
