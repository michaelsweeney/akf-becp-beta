import { ref_bldg_to_berdo_type, ref_bldg_to_ll97_type } from "lookups";
import {
  CaseInputSliceTypes,
  InputAreaTypes,
  InputCaseTypes,
  QueryDesignAreaTypes,
  ProjectionFromReferenceQueryTypes,
} from "types";
// const url = "https://akf-becp-pyapi.herokuapp.com/"; // deploymebnt
// const url = "https://localhost:5000"; // works on pc

const url = "http://127.0.0.1:5001/"; // works on mac

//@ts-ignore
async function getQueryResults(params, subdirectory) {
  let endpoint = `${url}/${subdirectory}?params=${JSON.stringify(params)}`;
  let response = await fetch(endpoint, {});

  let resjson = await response.json();
  return resjson;
}

async function getProjectionFromReferenceBuildings(
  case_inputs: CaseInputSliceTypes
) {
  const { global_inputs, area_inputs } = case_inputs;

  const case_ids = area_inputs.map((d) => d.case_id);

  let query_objects: ProjectionFromReferenceQueryTypes[] = [];

  case_ids.forEach((id) => {
    let global = global_inputs.find((d) => d.case_id === id) as InputCaseTypes;
    let areas = area_inputs.filter((d) => d.case_id === id);

    let query_areas: QueryDesignAreaTypes[] = areas.map((area) => {
      return {
        type: area.building_type,
        area: area.building_area,
        heating_fuel: area.heating_fuel,
        dhw_fuel: area.dhw_fuel,
        heating_cop: area.heating_cop,
        dhw_cop: area.dhw_cop,
        ashrae_standard: area.ashrae_standard,
      };
    });

    let query_schema = {
      state: global.location_state,
      climate_zone: global.climate_zone,
      projection_case: global.projection_case,
      design_areas: query_areas,
    };
    query_objects.push(query_schema);
  });

  for (const query_obj of query_objects) {
    try {
      console.log(query_obj);
      let case_results = await getQueryResults(
        query_obj,
        "get_projection_from_reference_buildings"
      );

      console.log(case_results);
    } catch {
      return;
    }
  }

  //@ts-ignore
  // let projection_results = [];
  // for (const alt of alternates) {
  //   /* GET CASE INFO (REFBUILDINGS / CAMBIUM) */
  //   let case_results;
  //   try {
  //     case_results = await getQueryResults(
  //       alt,
  //       "get_projection_from_reference_buildings"
  //     );
  //   } catch {
  //     return;
  //   }

  //   /* GET COMPLIANCE INFO */
  //   //@ts-ignore
  //   let berdo_types = alt["design_areas"].map((e) => {
  //     return {
  //       type: ref_bldg_to_berdo_type[e["type"]],
  //       area: e["building_area"],
  //     };
  //   });
  //   //@ts-ignore
  //   let ll97_types = alt["design_areas"].map((e) => {
  //     //@ts-ignore
  //     return {
  //       type: ref_bldg_to_ll97_type[e["type"]],
  //       area: e["building_area"],
  //     };
  //   });

  //   let { enduses_absolute_kbtu } = case_results.enduses;
  //   let fuels = {};
  //   enduses_absolute_kbtu.forEach((f) => {
  //     let { fuel, kbtu_absolute } = f;
  //     if (fuel in fuels) {
  //       //@ts-ignore
  //       fuels[fuel] += kbtu_absolute;
  //     } else {
  //       //@ts-ignore
  //       fuels[fuel] = 0;
  //     }
  //   });
  //   //@ts-ignore
  //   let compliance_utilities = [];
  //   Object.keys(fuels).forEach((key) => {
  //     //@ts-ignore
  //     let val = fuels[key];
  //     let fuel_name = key.toLowerCase().replace(" ", "_");
  //     compliance_utilities.push({
  //       type: fuel_name,
  //       val: val,
  //     });
  //   });

  //   let berdo_parameters = {
  //     types: berdo_types,
  //     //@ts-ignore
  //     utilities: compliance_utilities,
  //   };
  //   let ll97_parameters = {
  //     types: ll97_types,
  //     //@ts-ignore
  //     utilities: compliance_utilities,
  //   };

  //   let berdo_results = await getQueryResults(
  //     berdo_parameters,
  //     "/compliance/compile_berdo_summary"
  //   );
  //   let ll97_results = await getQueryResults(
  //     ll97_parameters,
  //     "/compliance/compile_ll97_summary"
  //   );

  //   let fuel_type = alt.design_areas[0].heating_fuel;
  //   let case_cop = alt.design_areas[0].heating_cop;
  //   /* COMPILE AND PUSH RESULTS */
  //   projection_results.push({
  //     case_name: alt.case_name,
  //     case_id: alt.id,
  //     is_displayed: alt.is_displayed,
  //     is_base_case: alt.is_base_case,
  //     case_fuel_type: fuel_type,
  //     case_cop: case_cop,
  //     case_results,
  //     ll97_results,
  //     berdo_results,
  //   });
  // }

  return;
}

// const createBaseComparison = (case_results) => {
//   let base_case = case_results.find((d) => d.is_base_case === true);
//   let alternates = case_results.filter((d) => d.is_base_case === false);

//   let base_case_2022_val = base_case.case_results.emissions_projection.find(
//     (d) => d.year === 2022
//   ).kg_co2_per_sf;
//   let base_case_2050_val = base_case.case_results.emissions_projection.find(
//     (d) => d.year === 2050
//   ).kg_co2_per_sf;

//   let comparison_array = [
//     {
//       name: base_case.case_name,
//       val_2022: base_case_2022_val,
//       val_2050: base_case_2050_val,
//       pct_2022: 0,
//       pct_2050: 0,
//     },
//   ];

//   alternates.forEach((alt, i) => {
//     let alt_2022_val = alt.case_results.emissions_projection.find(
//       (d) => d.year == 2022
//     ).kg_co2_per_sf;
//     let alt_2050_val = alt.case_results.emissions_projection.find(
//       (d) => d.year == 2050
//     ).kg_co2_per_sf;

//     let pct_2022 = 1 - alt_2022_val / base_case_2022_val;
//     let pct_2050 = 1 - alt_2050_val / base_case_2050_val;

//     let comparison = {
//       name: alt.case_name,
//       val_2022: alt_2022_val,
//       val_2050: alt_2050_val,
//       pct_2022: pct_2022,
//       pct_2050: pct_2050,
//     };
//     comparison_array.push(comparison);
//   });

//   let reordered_array = [];

//   case_results.forEach((d) => {
//     let { case_name } = d;
//     let comparison_case = comparison_array.find((d) => d.name === case_name);
//     reordered_array.push(comparison_case);
//   });
//   return reordered_array;
// };

// const case_results_displayed = projection_results.filter(
//   (f) => f.is_displayed === true
// );
// const results_comparison_displayed = createBaseComparison(
//   case_results_displayed
// );

// let icon_array_displayed = case_results_displayed.map((d, i) => {
//   let { case_fuel_type, case_cop } = d;

//   return {
//     case_name: d.case_name,
//     // case_color: getCaseColor(case_fuel_type, i),
//     // case_icon_d: getCaseIcon(case_fuel_type, case_cop),
//   };
// });

// resultsCallback({
//   projection_results: projection_results,
//   icon_array_displayed: icon_array_displayed,
//   case_comparison_displayed: results_comparison_displayed,
//   case_results_displayed: case_results_displayed,
// });

// isLoadingCallback(false);
// }

async function queryNoParameters(sub: string) {
  let endpoint = `${url}/${sub}`;
  let response = await fetch(endpoint, {});
  let resjson = await response.json();
  return resjson;
}

async function getAllStates() {
  let result = await queryNoParameters("get_all_states");
  return result;
}

export { getAllStates, queryNoParameters, getProjectionFromReferenceBuildings };
