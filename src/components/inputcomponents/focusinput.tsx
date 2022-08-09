import { useEffect, useState } from "react";
import React from "react";
import { Input, FormControl } from "@mui/material";

type PropTypes = {
  value: string | number;
  callback: (d: string | number) => void;
  inputType: string;
};

const FocusInput = (props: PropTypes) => {
  const { callback, value, inputType } = props;

  const handleInput = (v: string | number) => {
    callback(v);
  };

  return (
    <FormControl size="small" fullWidth>
      <Input
        sx={{ paddingLeft: 1 }}
        type={inputType}
        onFocus={(e) => {}}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleInput(e.target.value);
        }}
        value={value}
      />
    </FormControl>
  );
};
export { FocusInput };
