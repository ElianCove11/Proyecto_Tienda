import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();


const initialState = {
  cartItems: [],
};


function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      
      const exist = state.cartItems.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (exist) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product.id !== action.payload
        ),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.product.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.product.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    case "iNIZIALIZE_CART":
      return {
        ...state,
        cartItems: action.payload,
      };
   
    default:
      return state;
  }
}


export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado para acceder al contexto
export function useCart() {
  return useContext(CartContext);
}
