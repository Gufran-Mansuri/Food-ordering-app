import React, { useContext, useState } from "react";
import Modals from "../UI/Modals";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [errors, setErrors] = useState(null);
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItem = ctx.item.length > 0;
  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };
  const cartItemAddHanler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const showFormHandler = () => {
    setShowForm(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    setErrors(null);
    try {
      const response = await fetch(
        "https://food-app-a65a5-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            items: ctx.item,
          }),
        }
        
      );
      if(!response.ok){
        throw new Error("Something went wrong");
      }
      setDidSubmit(true);
    } catch (err) {
      setErrors(err.message);
      setDidSubmit(false)
    }
    setIsSubmitting(false);
    if(!errors){
      ctx.emptyCart();
    }
  };

  const modalFunction = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItem && (
        <button className={styles.button} onClick={showFormHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartModalContent = (
    <React.Fragment>
      <ul className={styles["cart-items"]}>
        {ctx.item.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHanler.bind(null, item)}
          />
        ))}
      </ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showForm && (
        <Checkout onConfirm={submitOrderHandler} onClose={props.onClose} />
      )}
      {!showForm && modalFunction}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data........</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  const errorModalContent = (
    <React.Fragment>
      <p>{errors}</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onClose}>
          Please Try Again
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modals onClose={props.onClose} key={Math.random()}>
       {!isSubmitting && !didSubmit && errors && errorModalContent}
      {!isSubmitting && !didSubmit && !errors && cartModalContent}
      {isSubmitting && !errors && isSubmittingModalContent}
      {!isSubmitting && didSubmit && !errors && didSubmitModalContent}
     
    </Modals>
  );
};

export default Cart;
