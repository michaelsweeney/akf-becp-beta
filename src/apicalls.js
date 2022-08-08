import {
  HeatPumpIconPath,
  ELECTRICITY_ICON_PATH,
  GAS_ICON_PATH,
} from "./components/svgicons";

import * as d3 from "d3";

import { ref_bldg_to_berdo_type, ref_bldg_to_ll97_type } from "./lookups";

const url = "https://akf-becp-pyapi.herokuapp.com/";
// const url = "http://localhost:5000";

async function getProjectionFromReferenceBuildings(
  alternates,
  resultsCallback,
  isLoadingCallback
) {
  isLoadingCallback(true);
  let projection_results = [];
  async function getQueryResults(params, subdirectory) {
    let endpoint = `${url}/${subdirectory}?params=${JSON.stringify(params)}`;
    let response = await fetch(endpoint, {});

    let resjson = await response.json();
    return resjson;
  }

  for (const alt of alternates) {
    /* GET CASE INFO (REFBUILDINGS / CAMBIUM) */
    let case_results;
    try {
      case_results = await getQueryResults(
        alt,
        "get_projection_from_reference_buildings"
      );
    } catch {
      resultsCallback(false);
      isLoadingCallback(false);
      return;
    }

    /* GET COMPLIANCE INFO */
    let berdo_types = alt["design_areas"].map((e) => {
      return {
        type: ref_bldg_to_berdo_type[e["type"]],
        area: e["area"],
      };
    });

    let ll97_types = alt["design_areas"].map((e) => {
      return {
        type: ref_bldg_to_ll97_type[e["type"]],
        area: e["area"],
      };
    });

    let { enduses_absolute_kbtu } = case_results.enduses;
    let fuels = {};
    enduses_absolute_kbtu.forEach((f) => {
      let { fuel, kbtu_absolute } = f;
      if (fuel in fuels) {
        fuels[fuel] += kbtu_absolute;
      } else {
        fuels[fuel] = 0;
      }
    });

    let compliance_utilities = [];
    Object.keys(fuels).forEach((key) => {
      let val = fuels[key];
      let fuel_name = key.toLowerCase().replace(" ", "_");
      compliance_utilities.push({
        type: fuel_name,
        val: val,
      });
    });

    let berdo_parameters = {
      types: berdo_types,
      utilities: compliance_utilities,
    };
    let ll97_parameters = {
      types: ll97_types,
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

    let fuel_type = alt.design_areas[0].heating_fuel;
    let case_cop = alt.design_areas[0].heating_cop;
    /* COMPILE AND PUSH RESULTS */
    projection_results.push({
      case_name: alt.case_name,
      case_id: alt.id,
      is_displayed: alt.is_displayed,
      is_base_case: alt.is_base_case,
      case_fuel_type: fuel_type,
      case_cop: case_cop,
      case_results,
      ll97_results,
      berdo_results,
    });
  }

  const createBaseComparison = (case_results) => {
    let base_case = case_results.find((d) => d.is_base_case === true);
    let alternates = case_results.filter((d) => d.is_base_case === false);

    let base_case_2022_val = base_case.case_results.emissions_projection.find(
      (d) => d.year === 2022
    ).kg_co2_per_sf;
    let base_case_2050_val = base_case.case_results.emissions_projection.find(
      (d) => d.year === 2050
    ).kg_co2_per_sf;

    let comparison_array = [
      {
        name: base_case.case_name,
        val_2022: base_case_2022_val,
        val_2050: base_case_2050_val,
        pct_2022: 0,
        pct_2050: 0,
      },
    ];

    alternates.forEach((alt, i) => {
      let alt_2022_val = alt.case_results.emissions_projection.find(
        (d) => d.year == 2022
      ).kg_co2_per_sf;
      let alt_2050_val = alt.case_results.emissions_projection.find(
        (d) => d.year == 2050
      ).kg_co2_per_sf;

      let pct_2022 = 1 - alt_2022_val / base_case_2022_val;
      let pct_2050 = 1 - alt_2050_val / base_case_2050_val;

      let comparison = {
        name: alt.case_name,
        val_2022: alt_2022_val,
        val_2050: alt_2050_val,
        pct_2022: pct_2022,
        pct_2050: pct_2050,
      };
      comparison_array.push(comparison);
    });

    let reordered_array = [];

    case_results.forEach((d) => {
      let { case_name } = d;
      let comparison_case = comparison_array.find((d) => d.name === case_name);
      reordered_array.push(comparison_case);
    });
    return reordered_array;
  };

  const case_results_displayed = projection_results.filter(
    (f) => f.is_displayed === true
  );
  const results_comparison_displayed = createBaseComparison(
    case_results_displayed
  );

  // MOVE TO APICALLS
  let getCaseIcon = (fuel_type, cop) => {
    if (fuel_type == "Natural Gas") {
      return GAS_ICON_PATH;
    } else if (fuel_type == "Electricity") {
      if (cop == 1) {
        return ELECTRICITY_ICON_PATH;
      } else {
        return HeatPumpIconPath;
      }
    }
  };

  let getCaseColor = (fuel_type, i) => {
    // source: https://www.schemecolor.com/red-to-blue-color-scheme.php

    let rScheme = d3.interpolateYlOrRd;
    let bScheme = d3.interpolatePuBu;

    // let reds = [rScheme(1), rScheme(0.8), rScheme(0.6)];
    // let blues = [bScheme(0.6), bScheme(1), bScheme(0.8)];
    let reds = ["#F31D64", "#FE433C", "#A224AD"];
    let blues = [bScheme(0.9), "#3C50B1", "#0095EF"];

    if (fuel_type === "Natural Gas") {
      return reds[i];
    } else if (fuel_type === "Electricity") {
      return blues[i];
    }
  };

  let icon_array_displayed = case_results_displayed.map((d, i) => {
    let { case_fuel_type, case_cop } = d;

    return {
      case_name: d.case_name,
      case_color: getCaseColor(case_fuel_type, i),
      case_icon_d: getCaseIcon(case_fuel_type, case_cop),
    };
  });

  resultsCallback({
    projection_results: projection_results,
    icon_array_displayed: icon_array_displayed,
    case_comparison_displayed: results_comparison_displayed,
    case_results_displayed: case_results_displayed,
  });

  isLoadingCallback(false);
}

async function getQueryNoParameters(sub) {
  let endpoint = `${url}/${sub}`;
  let response = await fetch(endpoint, {});
  let resjson = await response.json();
  return resjson;
}

async function getAllStates() {
  let result = await getQueryNoParameters("get_all_states");
  return result;
}

export {
  getAllStates,
  getQueryNoParameters,
  getProjectionFromReferenceBuildings,
};
