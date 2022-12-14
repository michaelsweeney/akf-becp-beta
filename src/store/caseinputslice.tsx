import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { hvac_templates } from "lookups";

import {
  InputCaseTypes,
  InputAreaTypes,
  CaseInputParametersPayloadTypes,
  CaseAreaInputParametersPayloadTypes,
  CaseInputSliceTypes,
  CaseAttributeTypes,
  HvacTemplateTypes,
  HeatingFuelTypes,
} from "types";

const initialState: CaseInputSliceTypes = {
  // any data not passed to api
  case_attributes: [
    {
      case_id: 0,
      case_name: "NG Heating",
      hvac_template: "ng_furnace",
      template_overridden: false,
    },
    {
      case_id: 1,
      case_name: "Electric Resistance Heating",
      hvac_template: "elec_resistance",
      template_overridden: false,
    },
  ],
  api_inputs: {
    global: [
      {
        case_id: 0,
        location_state: "NY",
        climate_zone: "4A",
        projection_case: "MidCase",
      },
      {
        case_id: 1,
        location_state: "NY",
        climate_zone: "4A",
        projection_case: "MidCase",
      },
    ],
    // area input api data
    areas: [
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
  },
  // global input api data
};

export const caseInputSlice = createSlice({
  name: "case_inputs",
  initialState: initialState,
  reducers: {
    setCaseAttributeParameter: (
      state: CaseInputSliceTypes,
      action: PayloadAction<CaseInputParametersPayloadTypes>
    ) => {
      const { case_id, key, value } = action.payload;

      let selection = state.case_attributes.find((d) => d.case_id === case_id);
      //@ts-ignore

      selection[key as keyof typeof selection] = value;
    },

    setInputsFromHVACTemplate: (
      state: CaseInputSliceTypes,
      action: PayloadAction<CaseInputParametersPayloadTypes>
    ) => {
      let template_key = action.payload.value;

      let template = hvac_templates.find(
        (d) => d.tag === template_key
      ) as HvacTemplateTypes;

      let case_id = action.payload.case_id;
      /*---hardset inputs to hvac template values---*/
      state.api_inputs.areas.forEach((area, i) => {
        if (area.case_id === case_id) {
          let area_obj = state.api_inputs.areas[i];
          area_obj.dhw_cop = template.heating_cop as number;
          area_obj.heating_cop = template.heating_cop as number;
          area_obj.dhw_fuel = template.heating_fuel as HeatingFuelTypes;
          area_obj.heating_fuel = template.heating_fuel as HeatingFuelTypes;
        }
      });

      /*---set hvac override to false---*/
      let attribute_obj = state.case_attributes.find(
        (d) => d.case_id === case_id
      ) as CaseAttributeTypes;
      attribute_obj.template_overridden = false;
    },
    setCaseGlobalParameter: (
      state: CaseInputSliceTypes,
      action: PayloadAction<CaseInputParametersPayloadTypes>
    ) => {
      const { case_id, key, value } = action.payload;

      let selection = state.api_inputs.global.find(
        (d) => d.case_id === case_id
      );
      //@ts-ignore

      selection[key as keyof typeof selection] = value;
    },
    setCaseAreaInputParameter: (
      state,
      action: PayloadAction<CaseAreaInputParametersPayloadTypes>
    ) => {
      let { case_id, area_id, key, value } = action.payload;
      let area_selection = state.api_inputs.areas.find(
        (d) => d.case_id === case_id && d.area_id === area_id
      );

      //@ts-ignore
      let prev_val = area_selection[key];

      //@ts-ignore
      area_selection[key] = value;

      /* -- set case hvac template to 'user-defined' if value is different than existing value */
      if (
        ["heating_cop", "heating_fuel", "dhw_fuel", "dhw_cop"].includes(key)
      ) {
        if (prev_val !== value) {
          let case_attribute_obj = state.case_attributes.find(
            (d) => d.case_id === case_id
          );
          if (case_attribute_obj) {
            case_attribute_obj.template_overridden = true;
          }
        }
      }
    },

    addCase: (state) => {
      let { api_inputs, case_attributes } = state;

      let case_ids = [...new Set(api_inputs.global.map((d) => d.case_id))];

      let id_to_copy = Math.min(...case_ids);

      let new_id = Math.max(...case_ids) + 1;

      // add new attributes
      let new_attribute_obj = {
        ...case_attributes.find((d) => d.case_id === id_to_copy),
      };
      new_attribute_obj.case_id = new_id;
      new_attribute_obj.case_name = new_attribute_obj.case_name + " (copy)";
      case_attributes.push(new_attribute_obj as CaseAttributeTypes);

      // add global
      let new_global_obj = {
        ...api_inputs.global.find((d) => d.case_id === id_to_copy),
      };
      new_global_obj.case_id = new_id;
      api_inputs.global.push(new_global_obj as InputCaseTypes);

      // add areas
      let areas_to_copy = api_inputs.areas.filter(
        (d) => d.case_id === id_to_copy
      );
      let new_area_array: InputAreaTypes[] = [];
      for (let i = 0; i < areas_to_copy.length; i++) {
        let new_obj: InputAreaTypes = {
          ...areas_to_copy[i],
          case_id: new_id,
        };
        new_area_array.push(new_obj);
      }
      new_area_array.forEach((a) => api_inputs.areas.push(a));
    },

    removeCase: (state, action: PayloadAction<{ case_id: number }>) => {
      let { case_id } = action.payload;

      state.api_inputs.global = state.api_inputs.global.filter(
        (d) => d.case_id !== case_id
      );
      state.api_inputs.areas = state.api_inputs.areas.filter(
        (d) => d.case_id !== case_id
      );

      state.case_attributes = state.case_attributes.filter(
        (d) => d.case_id !== case_id
      );
    },

    addAreaType: (state) => {
      let { api_inputs } = state;

      let area_ids = [...new Set(api_inputs.areas.map((d) => d.area_id))];
      let case_ids = [...new Set(api_inputs.global.map((d) => d.case_id))];
      let case_id_to_copy = Math.min(...case_ids);

      let area_id_to_copy = Math.min(...area_ids);
      let new_area_id = Math.max(...area_ids) + 1;

      let copied_area_obj = {
        ...api_inputs.areas.filter(
          (d) => d.case_id === case_id_to_copy && d.area_id === area_id_to_copy
        )[0],
      };

      case_ids.forEach((case_id) => {
        let a_obj = { ...copied_area_obj };
        a_obj.case_id = case_id;
        a_obj.area_id = new_area_id;
        api_inputs.areas.push(a_obj);
      });
    },

    removeAreaType: (state, action: PayloadAction<{ area_id: number }>) => {
      let { area_id } = action.payload;
      state.api_inputs.areas = state.api_inputs.areas.filter(
        (d) => d.area_id !== area_id
      );
    },
  },
});

export const caseInputActions = caseInputSlice.actions;

export default caseInputSlice.reducer;
