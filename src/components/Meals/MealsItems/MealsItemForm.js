import React, {useRef, useState} from "react";
import styles from "./MealsItemForm.module.css";
import FormInput from "../../UI/FormInput";
const MealsItemForm = (props) => {
    const amountRef = useRef();
    const [amountIsValid, setAmountIsVlid] = useState(true);

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = amountRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if(enteredAmountNumber.length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 10) {
            setAmountIsVlid(false);
            return;
        }
        props.onAdd(enteredAmountNumber);
    }
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <FormInput
        ref={amountRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "10",
          defaultValue: "1",
          step: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount 1-10 </p>}
    </form>
  );
};

export default MealsItemForm;
