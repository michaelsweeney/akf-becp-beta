// import produce from "immer";
// import { current } from "immer";

// import { InputCaseAreaTypes, InputCaseTypes } from "./statetypes";

// const initialState: InputCaseTypes[] = [
//   {
//     case_id: 0,
//     is_displayed: true,
//     is_base_case: true,
//     hvac_template: "ng_furnace",
//     case_name: "NG Heating",
//     location_state: "NY",
//     climate_zone: "4A",
//     projection_case: "MidCase",
//     design_areas: [
//       {
//         area_id: 0,
//         building_type: "HighriseApartment",
//         area: 200000,
//         heating_fuel: "Natural Gas",
//         dhw_fuel: "Natural Gas",
//         heating_cop: 0.8,
//         dhw_cop: 0.8,
//         ashrae_standard: "90.1-2016",
//       },
//       {
//         area_id: 1,
//         building_type: "MediumOffice",
//         area: 50000,
//         heating_fuel: "Natural Gas",
//         dhw_fuel: "Natural Gas",
//         heating_cop: 0.8,
//         dhw_cop: 0.8,
//         ashrae_standard: "90.1-2013",
//       },
//     ],
//   },
//   {
//     case_id: 1,
//     is_displayed: true,
//     is_base_case: false,
//     hvac_template: "elec_resistance",
//     case_name: "Electric Resistance Heating",
//     location_state: "NY",
//     climate_zone: "4A",
//     projection_case: "MidCase",
//     design_areas: [
//       {
//         area_id: 0,
//         building_type: "HighriseApartment",
//         area: 200000,
//         heating_fuel: "Electricity",
//         dhw_fuel: "Electricity",
//         heating_cop: 1,
//         dhw_cop: 1,
//         ashrae_standard: "90.1-2016",
//       },
//       {
//         area_id: 1,
//         building_type: "MediumOffice",
//         area: 50000,
//         heating_fuel: "Electricity",
//         dhw_fuel: "Electricity",
//         heating_cop: 1,
//         dhw_cop: 1,
//         ashrae_standard: "90.1-2013",
//       },
//     ],
//   },
//   {
//     case_id: 2,
//     is_displayed: true,
//     is_base_case: false,
//     hvac_template: "elec_ashp",
//     case_name: "Air Source HP Heating",
//     location_state: "NY",
//     climate_zone: "4A",
//     projection_case: "MidCase",
//     design_areas: [
//       {
//         area_id: 0,
//         building_type: "HighriseApartment",
//         area: 200000,
//         heating_fuel: "Electricity",
//         dhw_fuel: "Electricity",
//         heating_cop: 2.5,
//         dhw_cop: 3.5,
//         ashrae_standard: "90.1-2016",
//       },
//       {
//         area_id: 1,
//         building_type: "MediumOffice",
//         area: 50000,
//         heating_fuel: "Electricity",
//         dhw_fuel: "Electricity",
//         heating_cop: 2.5,
//         dhw_cop: 3.5,
//         ashrae_standard: "90.1-2013",
//       },
//     ],
//   },
// ];

// export default function buildingReducer(
//   state = initialState,
//   action: ActionPayload
// ) {
//   switch (action.type) {
//     case "SET_CASE_INPUTS": {
//       return [...action.payload];
//     }

//     case "SET_CASE_INPUT_PARAMETER": {
//       let { case_id, key, value } = action.payload;
//       let new_state: InputCaseTypes[] = produce(
//         state,
//         (draft: InputCaseTypes[]) => {
//           let selection = draft.find(
//             (d: InputCaseTypes) => d.case_id === case_id
//           );

//           //@ts-ignore
//           selection[key] = value;
//         }
//       );
//       return [...new_state];
//     }

//     case "SET_CASE_AREA_INPUT_PARAMETER": {
//       let { case_id, area_id, key, value } = action.payload;
//       let new_state = produce(state, (draft: InputCaseTypes[]) => {
//         let case_selection = draft.find(
//           (d: InputCaseTypes) => d.case_id === case_id
//         );

//         //@ts-ignore
//         let area_selection = case_selection.design_areas.find(
//           (d: InputCaseAreaTypes) => d.area_id == area_id
//         );

//         //@ts-ignore
//         area_selection[key] = value;
//       });
//       return [...new_state];
//     }

//     default:
//       return state;
//   }
// }
export {}