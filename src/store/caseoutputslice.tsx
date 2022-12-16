import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  CaseOutputSliceTypes,
  ProjectionFromReferenceOutputTypes,
} from "types";

const initialState: CaseOutputSliceTypes = {
  output_response: [],
};

export const caseOutputSlice = createSlice({
  name: "case_outputs",
  initialState: initialState,
  reducers: {
    setQueryResults: (
      state,
      action: PayloadAction<ProjectionFromReferenceOutputTypes[]>
    ) => {
      state.output_response = action.payload;
    },
  },
});

export const caseOutputActions = caseOutputSlice.actions;

export default caseOutputSlice.reducer;
