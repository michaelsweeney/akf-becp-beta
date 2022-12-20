import { CaseInputSliceTypes } from "types";
import * as d3 from "d3";
import {
  electricity_icon_path,
  gas_icon_path,
  mixed_icon_path,
} from "styling/icons";

const getCaseDisplayAttributes = (inputs: CaseInputSliceTypes) => {
  const { api_inputs, case_attributes } = inputs;

  let case_ids = api_inputs.global.map((d) => d.case_id);

  let attributes: any[] = [];
  case_ids.forEach((case_id, i) => {
    let case_name = case_attributes.find(
      (d) => d.case_id === case_id
    )?.case_name;

    let case_areas = api_inputs.areas.filter((d) => d.case_id === case_id);

    let case_fuels = [
      ...new Set([
        ...case_areas.map((d) => d.dhw_fuel),
        ...case_areas.map((d) => d.heating_fuel),
      ]),
    ];

    let fuel_type: "elec" | "gas" | "mixed";
    let fuel_color: string;
    let fuel_icon: string;

    let mixColorFunc = d3.interpolate("#c9ab01", "#504400");
    let elecColorFunc = d3.interpolate("#008ed5", "#004467");
    let gasColorFunc = d3.interpolate("#3dcc00", "#00550b");

    if (case_fuels.length !== 1) {
      fuel_type = "mixed";
      fuel_color = mixColorFunc(i / case_ids.length);
      fuel_icon = mixed_icon_path;
    } else if (case_fuels.includes("Natural Gas")) {
      fuel_type = "gas";
      fuel_color = gasColorFunc(i / case_ids.length);
      fuel_icon = gas_icon_path;
    } else if (case_fuels.includes("Electricity")) {
      fuel_type = "elec";
      fuel_color = elecColorFunc(i / case_ids.length);
      fuel_icon = electricity_icon_path;
    } else {
      console.error("error parsing fuel type", case_fuels);
      fuel_color = elecColorFunc(i / case_areas.length);
      fuel_type = "elec";
      fuel_icon = electricity_icon_path;
    }

    attributes.push({
      case_name: case_name,
      case_id: case_id,
      color: fuel_color,
      icon: fuel_icon,
    });
  });
  return attributes;
};

export { getCaseDisplayAttributes };
