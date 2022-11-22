import React, { useEffect, useState, FocusEvent, ChangeEvent } from "react";
import { Input, FormControl } from "@mui/material";

type PropTypes = {
  value: string | number;
  callback: (d: string | number) => void;
  input_type: string;
  is_disabled?: boolean;
};

const FocusInput = (props: PropTypes) => {
  const { callback, value, input_type, is_disabled = false } = props;

  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (v: string | number) => {
    if (input_type === "number") {
      setCurrentValue(+v);
    } else {
      setCurrentValue(v);
    }
  };

  const handleBlur = (v: string | number) => {
    console.log(v, currentValue);
    if (v === currentValue) {
      return;
    }

    if (input_type === "number") {
      callback(+v);
    } else {
      callback(v);
    }
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <FormControl size="small" fullWidth>
      <Input
        disabled={is_disabled}
        sx={{ paddingLeft: 1 }}
        type={input_type}
        onChange={(e: ChangeEvent) => {
          handleChange((e.target as HTMLInputElement).value);
        }}
        onBlur={(e: FocusEvent) => {
          handleBlur((e.target as HTMLInputElement).value);
        }}
        value={currentValue}
      />
    </FormControl>
  );
};
export { FocusInput };
