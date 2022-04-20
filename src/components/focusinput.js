import { Input } from "@mui/material";
import { useEffect, useState } from "react";
const FocusInput = (props) => {
  const { callback, value, inputType } = props;

  let [hardValue, setHardValue] = useState(value);

  let [inputValue, setInputValue] = useState(value);

  const handleInput = (v) => {
    setInputValue(v);
  };

  useEffect(() => {
    if (value != inputValue) {
      setInputValue(value);
    }
  }, [value]);

  return (
    <Input
      type={inputType}
      onFocus={(e) => {}}
      onChange={(e) => {
        handleInput(e.target.value);
      }}
      onBlur={(e) => {
        callback(e.target.value);
      }}
      value={inputValue}
    />
  );
};
export { FocusInput };
