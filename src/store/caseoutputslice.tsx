import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { RootState, AppThunk } from ".";
import { OutputStateTypes, ActionPayload } from "./statetypes";

export interface OutputState {
  case_results: any[];
  case_comparison_displayed: any[];
  case_results_displayed: any[];
  icon_array_displayed: any[];
  is_loading_error: boolean;
}

const initialState: OutputState = {
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
    setCaseResults: (state, action: any) => {
      if (action.payload === false) {
        state.is_loading_error = true;
      } else {
        state.case_results = action.case_results;
        state.case_comparison_displayed = action.case_comparison_displayed;
        state.case_results_displayed = action.case_results_displayed;
        state.icon_array_displayed = action.icon_array_displayed;
        state.is_loading_error = false;
      }
    },

    setIsLoadingError: (state, action: any) => {
      state.is_loading_error = action.payload;
    },
  },
});

export const { setCaseResults, setIsLoadingError } = caseOutputSlice.actions;

export const select_is_loading_error = (state: RootState) =>
  state.outputs.is_loading_error;

export default caseOutputSlice.reducer;
