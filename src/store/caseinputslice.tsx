import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

import * as types from "types";

type InitialStateType = {
  global_inputs: types.InputCaseTypes[];
  area_inputs: types.InputAreaTypes[];
};

const initialState: InitialStateType = {
  global_inputs: [
    {
      case_id: 0,
      hvac_template: "ng_furnace",
      case_name: "NG Heating",
      location_state: "NY",
      climate_zone: "4A",
      projection_case: "MidCase",
    },
    {
      case_id: 1,
      hvac_template: "elec_resistance",
      case_name: "Electric Resistance Heating",
      location_state: "NY",
      climate_zone: "4A",
      projection_case: "MidCase",
    },
  ],
  area_inputs: [
    {
      case_id: 1,
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
      case_id: 0,
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
      case_id: 1,
      area_id: 1,
      building_type: "SmallOffice",
      area: 200,
      heating_fuel: "Electricity",
      dhw_fuel: "Electricity",
      heating_cop: 1,
      dhw_cop: 1,
      ashrae_standard: "90.1-2016",
    },
    {
      case_id: 0,
      area_id: 1,
      building_type: "SmallOffice",
      area: 200,
      heating_fuel: "Natural Gas",
      dhw_fuel: "Natural Gas",
      heating_cop: 0.8,
      dhw_cop: 0.8,
      ashrae_standard: "90.1-2016",
    },
  ],
};

export const caseInputSlice = createSlice({
  name: "case_inputs",
  initialState: initialState,
  reducers: {
    setCaseInputParameter: (
      state,
      action: PayloadAction<types.CaseInputParametersPayload>
    ) => {
      const { case_id, key, value } = action.payload;

      let selection = state.global_inputs.find((d) => d.case_id === case_id);

      //@ts-ignore
      selection[key] = value;
    },
    setCaseAreaInputParameter: (
      state,
      action: PayloadAction<types.CaseAreaInputParametersPayload>
    ) => {
      let { case_id, area_id, key, value } = action.payload;

      let area_selection = state.area_inputs.find(
        (d) => d.case_id === case_id && d.area_id === area_id
      );
      //@ts-ignore
      area_selection[key] = value;
    },

    addCase: (state) => {
      let { global_inputs, area_inputs } = state;

      let case_ids = [...new Set(state.global_inputs.map((d) => d.case_id))];

      let id_to_copy = Math.min(...case_ids);

      let new_id = Math.max(...case_ids) + 1;

      let global_copy = {
        ...global_inputs.find((d) => d.case_id === id_to_copy),
        case_id: new_id,
      };

      global_inputs.push(global_copy as types.InputCaseTypes);

      let areas_to_copy = area_inputs.filter((d) => d.case_id === id_to_copy);

      let new_area_array: types.InputAreaTypes[] = [];
      for (let i = 0; i < areas_to_copy.length; i++) {
        let new_obj: types.InputAreaTypes = {
          ...areas_to_copy[i],
          case_id: new_id,
        };
        new_area_array.push(new_obj);
      }
      new_area_array.forEach((a) => area_inputs.push(a));
    },

    removeCase: (state, action: PayloadAction<{ case_id: number }>) => {
      return;
      // let { case_id } = action.payload;
      // return state.filter((d) => d.case_id !== case_id);
    },

    addAreaType: (state) => {
      return;
      // let ids = state[0].area_inputs.map((d) => d.area_id);
      // let new_id = Math.max(...ids) + 1;

      // let to_copy = { ...state[0].area_inputs[0] }; // default object to copy for a new case
      // to_copy.area_id = new_id;

      // state.forEach((c) => {
      //   c.area_inputs.push(to_copy);
      // });
    },

    removeAreaType: (state, action: PayloadAction<{ area_id: number }>) => {
      return;
      // let { area_id } = action.payload;

      // for (let i = 0; i < state.length; i++) {
      //   let area_inputs = state[i].area_inputs;
      //   let filtered_areas = area_inputs.filter((d) => d.area_id !== area_id);
      //   state[i].area_inputs = filtered_areas;
      // }
    },
  },
});

export const {
  setCaseInputParameter,
  setCaseAreaInputParameter,
  addCase,
  removeCase,
  addAreaType,
  removeAreaType,
} = caseInputSlice.actions;

export default caseInputSlice.reducer;
