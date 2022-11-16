import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { OutputStateTypes } from "types";

const initialState: OutputStateTypes = {
  case_results: [],
  is_loading_error: false,
};

export const caseOutputSlice = createSlice({
  name: "case_outputs",
  initialState: initialState,
  reducers: {
    setCaseResults: (state, action: PayloadAction<OutputStateTypes>) => {
      let { case_results } = action.payload;

      state.case_results = case_results;
      state.is_loading_error = false;
    },

    setIsLoadingError: (state, action: PayloadAction<boolean>) => {
      state.is_loading_error = action.payload;
    },
  },
});

export const { setCaseResults, setIsLoadingError } = caseOutputSlice.actions;

export default caseOutputSlice.reducer;
