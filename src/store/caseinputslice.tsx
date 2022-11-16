import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

import {
  InputCaseTypes,
  InputAreaTypes,
  CaseInputParametersPayloadTypes,
  CaseAreaInputParametersPayloadTypes,
  CaseInputSliceTypes,
} from "types";

const initialState: CaseInputSliceTypes = {
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
      building_type: "ApartmentHighRise",
      building_area: 200000,
      heating_fuel: "Electricity",
      dhw_fuel: "Electricity",
      heating_cop: 1,
      dhw_cop: 1,
      ashrae_standard: "STD2016",
    },
    {
      case_id: 0,
      area_id: 0,
      building_type: "ApartmentHighRise",
      building_area: 200000,
      heating_fuel: "Natural Gas",
      dhw_fuel: "Natural Gas",
      heating_cop: 0.8,
      dhw_cop: 0.8,
      ashrae_standard: "STD2016",
    },
    {
      case_id: 1,
      area_id: 1,
      building_type: "OfficeSmall",
      building_area: 200,
      heating_fuel: "Electricity",
      dhw_fuel: "Electricity",
      heating_cop: 1,
      dhw_cop: 1,
      ashrae_standard: "STD2016",
    },
    {
      case_id: 0,
      area_id: 1,
      building_type: "OfficeSmall",
      building_area: 200,
      heating_fuel: "Natural Gas",
      dhw_fuel: "Natural Gas",
      heating_cop: 0.8,
      dhw_cop: 0.8,
      ashrae_standard: "STD2016",
    },
  ],
};

export const caseInputSlice = createSlice({
  name: "case_inputs",
  initialState: initialState,
  reducers: {
    setCaseInputParameter: (
      state,
      action: PayloadAction<CaseInputParametersPayloadTypes>
    ) => {
      const { case_id, key, value } = action.payload;

      let selection = state.global_inputs.find((d) => d.case_id === case_id);

      //@ts-ignore
      selection[key] = value;
    },
    setCaseAreaInputParameter: (
      state,
      action: PayloadAction<CaseAreaInputParametersPayloadTypes>
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

      let new_obj = { ...global_inputs.find((d) => d.case_id === id_to_copy) };

      new_obj.case_id = new_id;
      new_obj.case_name = new_obj.case_name + " (copy)";

      global_inputs.push(new_obj as InputCaseTypes);

      let areas_to_copy = area_inputs.filter((d) => d.case_id === id_to_copy);

      let new_area_array: InputAreaTypes[] = [];
      for (let i = 0; i < areas_to_copy.length; i++) {
        let new_obj: InputAreaTypes = {
          ...areas_to_copy[i],
          case_id: new_id,
        };
        new_area_array.push(new_obj);
      }
      new_area_array.forEach((a) => area_inputs.push(a));
    },

    removeCase: (state, action: PayloadAction<{ case_id: number }>) => {
      let { case_id } = action.payload;

      state.global_inputs = state.global_inputs.filter(
        (d) => d.case_id !== case_id
      );
      state.area_inputs = state.area_inputs.filter(
        (d) => d.case_id !== case_id
      );
    },

    addAreaType: (state) => {
      let { global_inputs, area_inputs } = state;

      let area_ids = [...new Set(area_inputs.map((d) => d.area_id))];
      let case_ids = [...new Set(global_inputs.map((d) => d.case_id))];
      let case_id_to_copy = Math.min(...case_ids);

      let area_id_to_copy = Math.min(...area_ids);
      let new_area_id = Math.max(...area_ids) + 1;

      let copied_area_obj = {
        ...area_inputs.filter(
          (d) => d.case_id === case_id_to_copy && d.area_id === area_id_to_copy
        )[0],
      };

      case_ids.forEach((case_id) => {
        let a_obj = { ...copied_area_obj };
        a_obj.case_id = case_id;
        a_obj.area_id = new_area_id;
        area_inputs.push(a_obj);
      });
    },

    removeAreaType: (state, action: PayloadAction<{ area_id: number }>) => {
      let { area_id } = action.payload;
      state.area_inputs = state.area_inputs.filter(
        (d) => d.area_id !== area_id
      );
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
