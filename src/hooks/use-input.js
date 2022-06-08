import { useState } from "react";

const useInput = (valueValidate) => {
  const [value, setValue] = useState("");
  const [wasTouched, setWasTouched] = useState(false);

  const valueValid = valueValidate(value);
  const valueError = !valueValid && wasTouched;

  const valueBlurHandler = (event) => {
    setWasTouched(true);
  };

  const valueNameHandler = (event) => {
    setValue(event.target.value);
  };
  const reset = () => {
    setValue("");
    setWasTouched(false);
  };

  return {
    value: value,
    isValid: valueValid,
    valueError: valueError,
    valueBlurHandler,
    valueNameHandler,
    reset,
  };
};

export default useInput;
