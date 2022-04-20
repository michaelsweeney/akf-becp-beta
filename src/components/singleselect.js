import { conn } from "../store/connect";

import {
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  root: {},
  selectContainer: {
    margin: 10,
    marginBottom: 15,
    // padding: 0,
    width: 200,
  },
});

const SingleSelect = (props) => {
  const {
    id,
    label,
    value,
    callback,
    optionvalues,
    optiontitles = optionvalues,
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.selectContainer}>
      <FormControl size="small" fullWidth>
        <InputLabel id={id}>{label}</InputLabel>
        <Select labelId={id} value={value} label={label} onChange={callback}>
          {optionvalues.map((d, i) => {
            return (
              <MenuItem key={i} value={d}>
                {optiontitles[i]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export { SingleSelect };
