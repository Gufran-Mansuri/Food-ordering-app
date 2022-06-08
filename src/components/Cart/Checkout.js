import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";

const postalCode = /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/;
const Checkout = (props) => {
  const {
    value: name,
    isValid: isNameValid,
    valueError: nameInputHasError,
    valueBlurHandler: nameBlurHandler,
    valueNameHandler: nameHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");
  const {
    value: street,
    isValid: isStreetValid,
    valueError: streetInputHasError,
    valueBlurHandler: streetBlurHandler,
    valueNameHandler: streetHandler,
    reset: resetStreet,
  } = useInput((value) => value.trim() !== "");
  const {
    value: postal,
    isValid: isPostalValid,
    valueError: postalInputHasError,
    valueBlurHandler: postalBlurHandler,
    valueNameHandler: postalHandler,
    reset: resetPostal,
  } = useInput((value) => postalCode.test(value));
  const {
    value: city,
    isValid: isCityValid,
    valueError: cityInputHasError,
    valueBlurHandler: cityBlurHandler,
    valueNameHandler: cityHandler,
    reset: resetCity,
  } = useInput((value) => value.trim() !== "");

  let formValid = false;
  if (isNameValid && isStreetValid && isPostalValid && isCityValid) {
    formValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();
    if(!formValid){
      return;
    }
    props.onConfirm({
        name: name,
        street: street,
        postal: postal,
        city: city,
    })
    resetName();
    resetStreet();
    resetPostal();
    resetCity();

};

  const nameClass = `${nameInputHasError ? classes.invalid : '' }` 
  const streetClass = `${streetInputHasError ? classes.invalid : '' }` 
  const cityClass = `${cityInputHasError ? classes.invalid : '' }` 
  const postalClass = `${postalInputHasError ? classes.invalid : '' }` 

  

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${nameClass}`}>
        <label htmlFor="name">Your Name</label>
        <input
            type="text"
            id="name"
            value={name}
            onChange={nameHandler}
            onBlur={nameBlurHandler}
          />
          {nameInputHasError && <p>Name is not typed properly!!!</p>}
      </div>
      <div className={`${classes.control} ${streetClass}`}>
        <label htmlFor="street">Street</label>
        <input
            type="text"
            id="street"
            value={street}
            onChange={streetHandler}
            onBlur={streetBlurHandler}
          />
          {streetInputHasError && <p>Street Name not typed properly!!!</p>}
      </div>
      <div className={`${classes.control} ${postalClass}`}>
        <label htmlFor="postal">Postal Code</label>
        <input
            type="text"
            id="postal"
            value={postal}
            onChange={postalHandler}
            onBlur={postalBlurHandler}
          />
          {postalInputHasError && <p>Please enter a proper Postal code of Canada!!!</p>}
      </div>
      <div className={`${classes.control} ${cityClass}`}>
        <label htmlFor="city">City</label>
        <input
            type="text"
            id="city"
            value={city}
            onChange={cityHandler}
            onBlur={cityBlurHandler}
          />
          {cityInputHasError && <p>City is not typed properly!!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button disabled={!formValid} className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
