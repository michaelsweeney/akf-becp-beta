import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  CaseOutputSliceTypes,
  ProjectionFromReferenceOutputTypes,
} from "types";

const initialState: CaseOutputSliceTypes = {
  projection_from_reference_response: [],
};

export const caseOutputSlice = createSlice({
  name: "case_outputs",
  initialState: initialState,
  reducers: {
    setQueryResults: (
      state,
      action: PayloadAction<ProjectionFromReferenceOutputTypes[]>
    ) => {
      state.projection_from_reference_response = action.payload;
    },
  },
});

export const caseOutputActions = caseOutputSlice.actions;

export default caseOutputSlice.reducer;
