/** case input types **/
export type InputAreaTypes = {
  case_id: number;
  area_id: number;
  building_type: string;
  area: number;
  heating_fuel: string;
  dhw_fuel: string;
  heating_cop: number;
  dhw_cop: number;
  ashrae_standard: string;
};

export type InputCaseTypes = {
  case_id: number;
  hvac_template: string;
  case_name: string;
  location_state: string;
  climate_zone: string;
  projection_case: string;
};

export type OutputStateTypes = {
  case_results: any[];
  case_comparison_displayed: any[];
  case_results_displayed: any[];
  icon_array_displayed: any[];
  is_loading_error: boolean;
};

export type HvacTemplate = {
  tag: string;
  case_name: string;
  heating_fuel: string;
  heating_cop: string | number;
};

export type CaseInputParametersPayload = {
  key: string;
  value: string | number | boolean;
  case_id: number;
};

export type CaseAreaInputParametersPayload = {
  key: string;
  value: string | number | boolean;
  case_id: number;
  area_id: number;
};

/** ui types **/
export type LinkedAttributeTypes = {
  location_state: boolean;
  climate_zone: boolean;
  projection_case: boolean;
  hvac_template: boolean;
  building_type: boolean;
  building_area: boolean;
  ashrae_standard: boolean;
  heating_fuel: boolean;
  heating_cop: boolean;
  dhw_fuel: boolean;
  dhw_cop: boolean;
};

export type CaseDisplaySettingTypes = {
  case_id: number;
  is_displayed: boolean;
  is_base_case: boolean;
};

export type UiSliceTypes = {
  linked_attributes: LinkedAttributeTypes;
  case_display_settings: CaseDisplaySettingTypes[];
};
