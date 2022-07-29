export type InputCaseAreaTypes = {
  area_id: number;
  building_type: string;
  area: number;
  heating_fuel: string;
  dhw_fuel: string;
  heating_cop: number;
  dhw_cop: number;
  ashrae_standard: string;
};

export type InputCaseInputTypes = {
  case_id: number;
  is_displayed: boolean;
  is_base_case: boolean;
  hvac_template: string;
  case_name: string;
  location_state: string;
  climate_zone: string;
  projection_case: string;
  design_areas: InputCaseAreaTypes[];
};

export type OutputStateTypes = {
  case_results: any[];
  case_comparison_displayed: any[];
  case_results_displayed: any[];
  icon_array_displayed: any[];
  is_loading_error: boolean;
};

export type ActionPayload = {
  type: string;
  payload: any;
};

export type HvacTemplate = {
  tag: string;
  case_name: string;
  heating_fuel: string;
  heating_cop: string | number;
};
