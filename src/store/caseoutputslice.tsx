import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import * as types from "types";

const initialState: types.OutputStateTypes = {
  case_results: [],
  case_comparison_displayed: [],
  case_results_displayed: [],
  icon_array_displayed: [],
  is_loading_error: false,
};

export const caseOutputSlice = createSlice({
  name: "case_outputs",
  initialState: initialState,
  reducers: {
    setCaseResults: (state, action: PayloadAction<types.OutputStateTypes>) => {
      let {
        case_results,
        case_comparison_displayed,
        case_results_displayed,
        icon_array_displayed,
      } = action.payload;

      state.case_results = case_results;
      state.case_comparison_displayed = case_comparison_displayed;
      state.case_results_displayed = case_results_displayed;
      state.icon_array_displayed = icon_array_displayed;
      state.is_loading_error = false;
    },

    setIsLoadingError: (state, action: PayloadAction<boolean>) => {
      state.is_loading_error = action.payload;
    },
  },
});

export const { setCaseResults, setIsLoadingError } = caseOutputSlice.actions;

export default caseOutputSlice.reducer;
