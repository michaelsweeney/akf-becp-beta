import { getProjectionFromReferenceBuildings } from "api/apicalls";
import { useEffect } from "react";
import { caseOutputActions } from "store/caseoutputslice";
import { useAppSelector, useAppDispatch } from "store/hooks";

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

  return <div style={{ display: "none" }}></div>;
};

export default InputListener;
