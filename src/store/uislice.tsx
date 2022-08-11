import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import * as types from "types";

const initialState: types.UiSliceTypes = {
  linked_attributes: {
    case_name: false,
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
  case_display_settings: [
    { case_id: 0, is_displayed: true, is_base_case: true },
    { case_id: 1, is_displayed: true, is_base_case: false },
  ],
};

export const UiSlice = createSlice({
  name: "ui_settings",
  initialState: initialState,
  reducers: {
    setLinkedAttribute: (
      state,
      action: PayloadAction<{ key: string; bool: boolean }>
    ) => {
      let { key, bool } = action.payload;

      let typed_key = key as keyof types.LinkedAttributeTypes;
      state.linked_attributes[typed_key] = bool;
    },
  },
});

export const { setLinkedAttribute } = UiSlice.actions;

export default UiSlice.reducer;
