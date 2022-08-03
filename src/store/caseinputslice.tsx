import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { RootState, AppThunk } from ".";
import { InputCaseTypes } from "./types";

const initialState: InputCaseTypes[] = {
  case_results: [],
  case_comparison_displayed: [],
  case_results_displayed: [],
  icon_array_displayed: [],
  is_loading_error: false,
};

export const caseInputSlice = createSlice({
  name: "case_inputs",
  initialState: initialState,
  reducers: {
  }

  
});

export const {  } = caseInputSlice.actions;

export const select_is_loading_error = (state: RootState) =>
  state.outputs.is_loading_error;

export default caseInputSlice.reducer;
