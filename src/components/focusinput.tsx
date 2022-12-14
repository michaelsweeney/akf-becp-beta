import React, { useEffect, useState, FocusEvent, ChangeEvent } from "react";
import { Input, FormControl } from "@mui/material";
import styled from "@mui/styled-engine";

const InputWrapper = styled(Input)({
  paddingLeft: "0px !important",
});

type PropTypes = {
  value: string | number;
  callback: (d: string | number) => void;
  input_type: string;
  is_disabled?: boolean;
  fire_on?: "blur" | "change";
};

const FocusInput = (props: PropTypes) => {
  const {
    value,
    callback,
    input_type,
    is_disabled = false,
    fire_on = "blur",
  } = props;

  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (v: string | number) => {
    if (input_type === "number") {
      setCurrentValue(+v);
      if (fire_on === "change") {
        callback(+v);
      }
    } else {
      setCurrentValue(v);
      if (fire_on === "change") {
        callback(v);
      }
    }
  };

  const handleBlur = (v: string | number) => {
    if (fire_on === "blur") {
      if (v === currentValue) {
        return;
      }
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

  useEffect(() => {
    const handleEnter = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (input_type === "number") {
          callback(+currentValue);
        } else {
          callback(currentValue);
        }
      }
    };

    document.addEventListener("keydown", handleEnter, false);

    return () => {
      document.removeEventListener("keydown", handleEnter, false);
    };
  });

  return (
    <FormControl size="small" fullWidth>
      <InputWrapper
        size="small"
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
