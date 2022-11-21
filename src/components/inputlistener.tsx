import { getProjectionFromReferenceBuildings } from "api/apicalls";
import { useEffect } from "react";
import { caseOutputActions } from "store/caseoutputslice";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { uiActions } from "store/uislice";

import { ProjectionFromReferenceOutputTypes } from "types";

import * as lookups from "../lookups";

const InputListener = () => {
  const { case_inputs, case_outputs } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleChange = async () => {
      let query_results = await getProjectionFromReferenceBuildings(
        case_inputs
      );

      dispatch(
        caseOutputActions.setQueryResults(
          query_results as ProjectionFromReferenceOutputTypes[]
        )
      );
    };

    handleChange();
  }, [case_inputs]);

  // window listener
  useEffect(() => {
    const handleResize = () => {
      dispatch(
        uiActions.setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      );
    };

    // initialize size
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <div style={{ display: "none" }}></div>;
};

export default InputListener;
