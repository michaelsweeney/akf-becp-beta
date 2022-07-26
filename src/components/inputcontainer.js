import React, { useEffect, useState } from "react"; // << NO ERROR
import { conn } from "../store/connect"; // << NO ERROR

import InputForm from "./inputform";

const InputContainer = (props) => {
  return <InputForm />;
};

const mapStateToProps = (store) => {
  return {
    case_inputs: store.case_inputs,
  };
};

export default conn(mapStateToProps)(InputContainer);
