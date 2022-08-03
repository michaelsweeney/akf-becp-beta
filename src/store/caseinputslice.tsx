import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { RootState, AppThunk } from ".";
import { InputCaseTypes } from "./types";

const initialState: InputCaseTypes[] = [
    {
      case_id: 0,
      is_displayed: true,
      is_base_case: true,
      hvac_template: "ng_furnace",
      case_name: "NG Heating",
      location_state: "NY",
      climate_zone: "4A",
      projection_case: "MidCase",
      design_areas: [
        {
          area_id: 0,
          building_type: "HighriseApartment",
          area: 200000,
          heating_fuel: "Natural Gas",
          dhw_fuel: "Natural Gas",
          heating_cop: 0.8,
          dhw_cop: 0.8,
          ashrae_standard: "90.1-2016",
        },
        {
          area_id: 1,
          building_type: "MediumOffice",
          area: 50000,
          heating_fuel: "Natural Gas",
          dhw_fuel: "Natural Gas",
          heating_cop: 0.8,
          dhw_cop: 0.8,
          ashrae_standard: "90.1-2013",
        },
      ],
    },
    {
      case_id: 1,
      is_displayed: true,
      is_base_case: false,
      hvac_template: "elec_resistance",
      case_name: "Electric Resistance Heating",
      location_state: "NY",
      climate_zone: "4A",
      projection_case: "MidCase",
      design_areas: [
        {
          area_id: 0,
          building_type: "HighriseApartment",
          area: 200000,
          heating_fuel: "Electricity",
          dhw_fuel: "Electricity",
          heating_cop: 1,
          dhw_cop: 1,
          ashrae_standard: "90.1-2016",
        },
        {
          area_id: 1,
          building_type: "MediumOffice",
          area: 50000,
          heating_fuel: "Electricity",
          dhw_fuel: "Electricity",
          heating_cop: 1,
          dhw_cop: 1,
          ashrae_standard: "90.1-2013",
        },
      ],
    },
    {
      case_id: 2,
      is_displayed: true,
      is_base_case: false,
      hvac_template: "elec_ashp",
      case_name: "Air Source HP Heating",
      location_state: "NY",
      climate_zone: "4A",
      projection_case: "MidCase",
      design_areas: [
        {
          area_id: 0,
          building_type: "HighriseApartment",
          area: 200000,
          heating_fuel: "Electricity",
          dhw_fuel: "Electricity",
          heating_cop: 2.5,
          dhw_cop: 3.5,
          ashrae_standard: "90.1-2016",
        },
        {
          area_id: 1,
          building_type: "MediumOffice",
          area: 50000,
          heating_fuel: "Electricity",
          dhw_fuel: "Electricity",
          heating_cop: 2.5,
          dhw_cop: 3.5,
          ashrae_standard: "90.1-2013",
        },
      ],
    },
  ];

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
