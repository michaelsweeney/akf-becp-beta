import React, { useEffect, useState } from "react"; // << NO ERROR
import { conn } from "../store/connect"; // << NO ERROR
import { Button } from "@mui/material";
import InputForm from "./inputform";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    margin: 50,
    border: "5px solid black",
    boxSizing: "border-box",
  },
});

const InputContainer = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <InputForm />
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    case_inputs: store.case_inputs,
  };
};

export default conn(mapStateToProps)(InputContainer);
