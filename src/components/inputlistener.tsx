import {
  queryNoParameters,
  getProjectionFromReferenceBuildings,
} from "api/apicalls";
import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "store/hooks";
import * as types from "types";

import * as lookups from "../lookups";
const InputListener = () => {
  const { case_inputs, case_outputs } = useAppSelector((state) => state);

  useEffect(() => {
    const handleChange = async () => {
      // let states = await queryNoParameters("get_all_states");

      // console.log(states);

      let res = await getProjectionFromReferenceBuildings(case_inputs);

      console.log(res);
    };

    handleChange();
  }, [case_inputs]);

  return <div style={{ display: "none" }}></div>;
};

export default InputListener;
