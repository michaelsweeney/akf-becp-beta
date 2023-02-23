import { ref_bldg_to_berdo_type, ref_bldg_to_ll97_type } from "lookups";
import { CaseInputSliceTypes, InputCaseTypes } from "types";
// const url = "https://akf-becp-pyapi.herokuapp.com/"; // deploymebnt
const url = "https://akf-becp-backend.herokuapp.com/"; // akf deployment
// const url = "https://localhost:5000"; // works on pc
// const url = "http://127.0.0.1:5001/"; // works on mac

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
  const { api_inputs } = case_inputs;
  const case_ids = [...new Set(api_inputs.areas.map((d) => d.case_id))].sort();
  let projection_results: any[] = [];
  /* --- ITERATE EACH CASE --- */
  for (const id of case_ids) {
    let global = api_inputs.global.find(
      (d) => d.case_id === id
    ) as InputCaseTypes;
    let areas = api_inputs.areas.filter((d) => d.case_id === id);

    /* --- GET CASE RESULTS --- */
    let query_areas = areas.map((area) => {
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

    let case_query_schema = {
      state: global.location_state,
      climate_zone: global.climate_zone,
      projection_case: global.projection_case,
      design_areas: query_areas,
    };

    let case_results: any;
    case_results = await getQueryResults(
      case_query_schema,
      "get_projection_from_reference_buildings"
    );

    if (case_results) {
      /* --- GET COMPLIANCE RESULTS IF CASE RESULTS QUERY SUCCESSFUL --- */
      let berdo_building_info = areas.map((e) => {
        return {
          type: ref_bldg_to_berdo_type[e.building_type],
          area: e.building_area,
        };
      });
      //@ts-ignore
      let ll97_building_info = areas.map((e) => {
        //@ts-ignore
        return {
          type: ref_bldg_to_ll97_type[e.building_type],
          area: e.building_area,
        };
      });
      let { enduses_absolute_kbtu } = case_results.enduses;
      let fuels = {};
      //@ts-ignore
      enduses_absolute_kbtu.forEach((f) => {
        let { fuel, kbtu_absolute } = f;
        if (fuel in fuels) {
          //@ts-ignore
          fuels[fuel] += kbtu_absolute;
        } else {
          //@ts-ignore
          fuels[fuel] = 0;
        }
      });
      //@ts-ignore
      let compliance_utilities = [];
      Object.keys(fuels).forEach((key) => {
        //@ts-ignore
        let val = fuels[key];
        let fuel_name = key.toLowerCase().replace(" ", "_");
        compliance_utilities.push({
          type: fuel_name,
          val: val,
        });
      });

      let berdo_parameters = {
        types: berdo_building_info,
        //@ts-ignore
        utilities: compliance_utilities,
      };
      let ll97_parameters = {
        types: ll97_building_info,
        //@ts-ignore
        utilities: compliance_utilities,
      };

      let berdo_results = await getQueryResults(
        berdo_parameters,
        "/compliance/compile_berdo_summary"
      );
      let ll97_results = await getQueryResults(
        ll97_parameters,
        "/compliance/compile_ll97_summary"
      );

      /* COMPILE AND PUSH RESULTS */
      projection_results.push({
        case_id: id,
        case_results,
        ll97_results,
        berdo_results,
      });
    }
  }

  // reorder projection_results

  return projection_results;
}

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
