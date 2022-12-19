import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  UiSliceTypes,
  LinkedAttributeTypes,
  WindowDimensionTypes,
} from "types";

const initialState: UiSliceTypes = {
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
  sidebar_open: false,
  sidebar_width: 0,
  sidebar_collapse_width: 50,
  window_dimensions: { height: 0, width: 0 },
  sidebar_ref: null,
  is_api_loading: false,
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

      let typed_key = key as keyof LinkedAttributeTypes;
      state.linked_attributes[typed_key] = bool;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebar_open = action.payload;
    },
    setSidebarWidth: (state, action: PayloadAction<number>) => {
      state.sidebar_width = action.payload;
    },
    setSidebarCollapseWidth: (state, action: PayloadAction<number>) => {
      state.sidebar_collapse_width = action.payload;
    },
    setWindowDimensions: (
      state,
      action: PayloadAction<WindowDimensionTypes>
    ) => {
      state.window_dimensions = action.payload;
    },
    setIsApiLoading: (state, action: PayloadAction<boolean>) => {
      state.is_api_loading = action.payload;
    },
  },
});

export const uiActions = UiSlice.actions;

export default UiSlice.reducer;
