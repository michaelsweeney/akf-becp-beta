import { useEffect, useState } from "react";
import React from "react";
import { Input, FormControl } from "@mui/material";

type PropTypes = {
  value: string | number;
  callback: (d: string | number) => void;
  input_type: string;
  is_disabled?: boolean;
};

const FocusInput = (props: PropTypes) => {
  const { callback, value, input_type, is_disabled = false } = props;

  const handleInput = (v: string | number) => {
    callback(v);
  };

  return (
    <FormControl size="small" fullWidth>
      <Input
        disabled={is_disabled}
        sx={{ paddingLeft: 1 }}
        type={input_type}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleInput(e.target.value);
        }}
        value={value}
      />
    </FormControl>
  );
};
export { FocusInput };
