import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

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
      }

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

      let selection = state.find((d) => d.case_id === case_id);
      //@ts-ignore
      selection[key as keyof typeof selection] = value;
      return state;
    },
    setCaseAreaInputParameter: (
      state,
      action: PayloadAction<types.CaseAreaInputParametersPayload>
    ) => {
      let { case_id, area_id, key, value } = action.payload;

      let case_selection = state.find(
        (d) => d.case_id === case_id
      );

      if (case_selection) {
        let area_selection=
          case_selection.design_areas.find(
            (d) => d.area_id === area_id
          );

        //@ts-ignore
        area_selection[key as keyof typeof area_selection] = value;
      }
    },
    addCase: (state) => {
      let ids = state.map(d => d.case_id)
      let new_id = Math.max(...ids) + 1
      let to_copy = { ...state[0] }; // default object to copy for a new case
      to_copy.case_id = new_id
      state.push(to_copy);
    },

    removeCase: (state, action: PayloadAction<{case_id: number}>) => {
      let {case_id} = action.payload;
      return state.filter(d => d.case_id !== case_id)  
    },

    addAreaType: (state) => {
      let ids = state[0].design_areas.map(d => d.area_id)
      let new_id = Math.max(...ids) + 1
      
      let to_copy = {...state[0].design_areas[0]}; // default object to copy for a new case
      to_copy.area_id = new_id

      state.forEach(c => {
        c.design_areas.push(to_copy)
      })
    },

    removeAreaType: (state, action: PayloadAction<{area_id: number}>)  => {

      let {area_id} = action.payload;

      for (let i = 0; i< state.length; i++) {
        let design_areas = state[i].design_areas
        let filtered_areas = design_areas.filter(d => d.area_id !== area_id)
        state[i].design_areas = filtered_areas
      }
    }
  },
});

export const {
  setCaseInputs,
  setCaseInputParameter,
  setCaseAreaInputParameter,
  addCase,
  removeCase,
  addAreaType,
  removeAreaType
} = caseInputSlice.actions;

export default caseInputSlice.reducer;
