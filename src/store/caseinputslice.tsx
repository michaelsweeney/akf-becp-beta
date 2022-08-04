import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import * as types from "types";

const initialState: types.InputCaseTypes[] = [
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
    setCaseInputs: (state, action: PayloadAction<types.InputCaseTypes[]>) => {
      action.payload = state;
    },
    setCaseInputParameter: (
      state,
      action: PayloadAction<types.CaseInputParametersPayload>
    ) => {
      let { case_id, key, value } = action.payload;

      let selection = state.find(
        (d: types.InputCaseTypes) => d.case_id === case_id
      );
      //@ts-ignore
      selection[key] = value;
    },
    setCaseAreaInputParameter: (
      state,
      action: PayloadAction<types.CaseAreaInputParametersPayload>
    ) => {
      let { case_id, area_id, key, value } = action.payload;

      let case_selection = state.find(
        (d: types.InputCaseTypes) => d.case_id === case_id
      );

      //@ts-ignore
      let area_selection = case_selection.design_areas.find(
        (d: types.InputAreaTypes) => d.area_id === area_id
      );
      //@ts-ignore
      area_selection[key] = value;
    },
  },
});

export const {
  setCaseInputs,
  setCaseInputParameter,
  setCaseAreaInputParameter,
} = caseInputSlice.actions;

export default caseInputSlice.reducer;
