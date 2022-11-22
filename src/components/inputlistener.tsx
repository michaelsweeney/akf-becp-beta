import { getProjectionFromReferenceBuildings } from "api/apicalls";
import { useEffect } from "react";
import { caseOutputActions } from "store/caseoutputslice";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { uiActions } from "store/uislice";

import { ProjectionFromReferenceOutputTypes } from "types";

import * as lookups from "../lookups";

const InputListener = () => {
  const { case_inputs, case_outputs } = useAppSelector((state) => state);

  const { linked_attributes } = useAppSelector((state) => state.ui_settings);

  const dispatch = useAppDispatch();

  // update whenever inputs change.
  useEffect(() => {
    const handleChange = () => {
      dispatch(uiActions.setIsApiLoading(true));
      getProjectionFromReferenceBuildings(case_inputs).then((query_results) => {
        dispatch(
          caseOutputActions.setQueryResults(
            query_results as ProjectionFromReferenceOutputTypes[]
          )
        );
        dispatch(uiActions.setIsApiLoading(false));
      });
    };

    handleChange();
  }, [case_inputs.api_inputs]);

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
