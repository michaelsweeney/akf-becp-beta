import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import * as types from "types";

const initialState: types.UiSliceTypes = {
  linked_attributes: {
    location_state: true,
    climate_zone: true,
    projection_case: true,
    hvac_template: false,
    building_type: true,
    building_area: true,
    ashrae_standard: true,
    heating_fuel: false,
    heating_cop: false,
    dhw_fuel: false,
    dhw_cop: false,
  },
};

export const UiSlice = createSlice({
  name: "ui_settings",
  initialState: initialState,
  reducers: {
    doSomething: () => {},
  },
});

export const { doSomething } = UiSlice.actions;

export default UiSlice.reducer;
