import { useEffect, useState } from "react";

import { Input, FormControl } from "@mui/material";

type Props = {
  value: string | number;
  callback: (d: string) => void;
  inputType: string;
};

const FocusInput = (props: Props) => {
  const { callback, value, inputType } = props;

  let [inputValue, setInputValue] = useState(value);

  const handleInput = (v: string) => {
    setInputValue(v);
  };

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value);
    }
  }, [value, inputValue]);

  return (
    <FormControl size="small" fullWidth>
      <Input
        sx={{ paddingLeft: 1 }}
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
    </FormControl>
  );
};
export { FocusInput };
