import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultState = {
  item: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.item.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.item[existingCartItemIndex];
    let updatedItemess;

    if (existingCartItem) {
      const upadteItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItemess = [...state.item];
      updatedItemess[existingCartItemIndex] = upadteItem;
    } else {
      updatedItemess = state.item.concat(action.item);
    }

    const updateTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      item: updatedItemess,
      totalAmount: updateTotalAmount,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.item.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.item[existingCartItemIndex];
    const updatedtotaAmount = state.totalAmount - existingItem.price;
    let updatedItemess;
    if (existingItem.amount === 1) {
      updatedItemess = state.item.filter((item) => item.id !== action.id);
    } else {
      const updateItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItemess = [...state.item];
      updatedItemess[existingCartItemIndex] = updateItem;
    }
    return {
      item: updatedItemess,
      totalAmount: updatedtotaAmount,
    };
  }
  if (action.typr === "EMPTY_CART") {
    return defaultState;
  }
  return defaultState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState);
  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: "ADD_ITEM",
      item: item,
    });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };
  const clearCartHandler = () => {
    dispatchCartAction({ type: "EMPTY_CART" });
  };

  const cartContext = {
    item: cartState.item,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    emptyCart: clearCartHandler
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
