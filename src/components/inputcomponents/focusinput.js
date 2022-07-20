import { useEffect, useState } from "react";

import { Input, FormControl } from "@mui/material";




const FocusInput = (props) => {
  const { callback, value, inputType } = props;

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
    <FormControl size="small" fullWidth>
      <Input
        sx={{ paddingLeft: 1, }}
        type={inputType}
        onFocus={(e) => { }}
        onChange={(e) => {
          handleInput(e.target.value);
        }}
        onBlur={(e) => {
          callback(e.target.value);
        }}
        value={inputValue}
      />
    </FormControl>


  );
};
export { FocusInput };
