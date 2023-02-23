import { CaseInputSliceTypes } from "types";
import * as d3 from "d3";
import {
  electricity_icon_path,
  gas_icon_path,
  mixed_icon_path,
} from "styling/icons";

import { createElecIcon } from "styling/iconsvg/elec";
import { createGasIcon } from "styling/iconsvg/gas";
import { createMixedIcon } from "styling/iconsvg/mixed";

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

    let mixColorFunc = d3.interpolate("#22A5A1", "#8BD2CF");
    let elecColorFunc = d3.interpolate("#0E1B2C", "#89A5CD");
    let gasColorFunc = d3.interpolate("#D86827", "#F1A01F");

    // fuel_color = d3.schemeTableau10[i];
    if (case_fuels.length !== 1) {
      fuel_type = "mixed";
      fuel_color = mixColorFunc(i / case_ids.length);
      fuel_icon = createMixedIcon(fuel_color);
    } else if (case_fuels.includes("Natural Gas")) {
      fuel_type = "gas";
      fuel_color = gasColorFunc(i / case_ids.length);
      fuel_icon = createGasIcon(fuel_color);
    } else if (case_fuels.includes("Electricity")) {
      fuel_type = "elec";
      fuel_color = elecColorFunc(i / case_ids.length);
      fuel_icon = createElecIcon(fuel_color);
    } else {
      console.error("error parsing fuel type", case_fuels);
      fuel_color = elecColorFunc(i / case_areas.length);
      fuel_type = "elec";
      fuel_icon = createElecIcon(fuel_color);
    }

    attributes.push({
      fuel_type: fuel_type,
      case_name: case_name,
      case_id: case_id,
      color: fuel_color,
      icon: fuel_icon,
    });
  });
  return attributes;
};

export { getCaseDisplayAttributes };
