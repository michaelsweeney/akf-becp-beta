import { DraftsOutlined } from "@material-ui/icons";
import produce from "immer";
import { current } from "immer";

const initialState = {
  case_inputs: [
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
  ],
};




export default function buildingReducer(state = initialState, action) {
  switch (action.type) {

    case "SET_CASE_INPUTS": {
      return {
        ...state,
        case_inputs: action.payload,
      };
    }


    case "SET_CASE_INPUT_PARAMETER": {
      let { case_id, key, value } = action.payload;
      let new_state = produce(state, (draft) => {
        let selection = draft.case_inputs.find((d) => d.case_id === case_id);
        selection[key] = value;
      });
      return {
        ...new_state,
      };
    }

    case "SET_CASE_AREA_INPUT_PARAMETER": {
      let { case_id, area_id, key, value } = action.payload;
      let new_state = produce(state, (draft) => {
        let case_selection = draft.case_inputs.find((d) => d.case_id === case_id);
        let area_selection = case_selection.design_areas.find(d => d.area_id == area_id)
        area_selection[key] = value;
      });
      return {
        ...new_state,
      };
    }

    // case "SET_GLOBAL_CASE_PARAMETERS": {
    //   let key = action.payload[0];
    //   let val = action.payload[1];

    //   let new_state = produce(state, (draft) => {
    //     let modified_inputs = draft.case_inputs;
    //     state.case_inputs.forEach((c, i) => {
    //       if (key == "building_type") {
    //         modified_inputs[i]["design_areas"][0]["type"] = val;
    //       } else if (key == "ashrae_standard") {
    //         modified_inputs[i]["design_areas"][0]["ashrae_standard"] = val;
    //       } else {
    //         modified_inputs[i][key] = val;
    //       }
    //     });
    //   });

    //   return {
    //     ...new_state,
    //   };
    // }

    // case "SET_CASE_HEATING_COP": {
    //   let { idx, cop } = action.payload;

    //   let new_state = produce(state, (draft) => {
    //     let selected_case = draft.case_inputs.find((d) => d.case_id === idx);
    //     selected_case.design_areas[0].heating_cop = +cop;
    //   });

    //   return new_state;
    // }

    // case "SET_CASE_HEATING_FUEL_SOURCE": {
    //   let { idx, source } = action.payload;

    //   let new_state = produce(state, (draft) => {
    //     let selected_case = draft.case_inputs.find((d) => d.case_id === idx);
    //     selected_case.design_areas[0].heating_fuel = source;
    //   });
    //   return new_state;
    // }

    // case "SET_CASE_DOMESTIC_COP": {
    //   let { idx, cop } = action.payload;

    //   let new_state = produce(state, (draft) => {
    //     let selected_case = draft.case_inputs.find((d) => d.case_id === idx);
    //     selected_case.design_areas[0].dhw_cop = +cop;
    //   });

    //   return new_state;
    // }

    // case "SET_CASE_DOMESTIC_FUEL_SOURCE": {
    //   let { idx, source } = action.payload;

    //   let new_state = produce(state, (draft) => {
    //     let selected_case = draft.case_inputs.find((d) => d.case_id === idx);
    //     selected_case.design_areas[0].dhw_fuel = source;
    //   });
    //   return new_state;
    // }

    // case "SET_CASE_HEATING_AND_DOMESTIC_COP": {
    //   let { idx, cop } = action.payload;

    //   let new_state = produce(state, (draft) => {
    //     let selected_case = draft.case_inputs.find((d) => d.case_id === idx);
    //     selected_case.design_areas[0].heating_cop = +cop;
    //     selected_case.design_areas[0].dhw_cop = +cop;
    //   });

    //   return new_state;
    // }

    // case "SET_CASE_HEATING_AND_DOMESTIC_FUEL_SOURCE": {
    //   let { idx, source } = action.payload;

    //   let new_state = produce(state, (draft) => {
    //     let selected_case = draft.case_inputs.find((d) => d.case_id === idx);
    //     selected_case.design_areas[0].heating_fuel = source;
    //     selected_case.design_areas[0].dhw_fuel = source;
    //   });

    //   return new_state;
    // }



    // case "SET_BASE_CASE": {
    //   let { idx } = action.payload;
    //   let new_state = produce(state, (draft) => {
    //     draft.case_inputs.forEach((e, i) => {
    //       draft.case_inputs[i].is_base_case = e.case_id === idx ? true : false;
    //     });
    //   });
    //   return {
    //     ...new_state,
    //   };
    // }

    // case "SET_CASE_HEATING_TEMPLATE": {
    //   let { idx, template } = action.payload;

    //   let new_state = produce(state, (draft) => {
    //     let selection = draft.case_inputs.find((d) => d.case_id === idx);
    //     selection.hvac_template = template;
    //   });

    //   return {
    //     ...new_state,
    //   };
    // }

    // case "SET_CASE_IS_DISPLAYED": {
    //   let { idx, bool } = action.payload;

    //   let new_state = produce(state, (draft) => {
    //     let selected_case = draft.case_inputs.find((d) => d.case_id === idx);
    //     selected_case.is_displayed = bool;
    //   });

    //   return {
    //     ...new_state,
    //   };
    // }

    default:
      return state;
  }
}
