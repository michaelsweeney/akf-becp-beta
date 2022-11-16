export type LocationStateTypes =
  | "AL"
  | "AR"
  | "AZ"
  | "CA"
  | "CO"
  | "CT"
  | "DE"
  | "FL"
  | "GA"
  | "IA"
  | "ID"
  | "IL"
  | "IN"
  | "KS"
  | "KY"
  | "LA"
  | "MA"
  | "MD"
  | "ME"
  | "MI"
  | "MN"
  | "MO"
  | "MS"
  | "MT"
  | "NC"
  | "ND"
  | "NE"
  | "NH"
  | "NJ"
  | "NM"
  | "NV"
  | "NY"
  | "OH"
  | "OK"
  | "OR"
  | "PA"
  | "RI"
  | "SC"
  | "SD"
  | "TN"
  | "TX"
  | "UT"
  | "VA"
  | "VT"
  | "WA"
  | "WI"
  | "WV"
  | "WY";

export type ClimateZoneTypes =
  | "1A"
  | "2A"
  | "2B"
  | "3A"
  | "3B"
  | "3C"
  | "4A"
  | "4B"
  | "4C"
  | "5A"
  | "5B"
  | "6A"
  | "6B"
  | "7A"
  | "8A";

export type CoefficientCaseTypes =
  | "HighRECost"
  | "LowRECost"
  | "MidCase"
  | "MidCase95by2035"
  | "MidCase95by2050"
  | "BERDO";

export type ASHRAEStandardTypes = "STD2013" | "STD2016" | "STD2019";

export type BuildingTypeTypes =
  | "OfficeLarge"
  | "OfficeSmall"
  | "Hospital"
  | "OfficeMedium"
  | "SchoolPrimary"
  | "HotelSmall"
  | "HotelLarge"
  | "RetailStandalone"
  | "RetailStripmall"
  | "ApartmentHighRise"
  | "RestaurantFastFood"
  | "Warehouse"
  | "RestaurantSitDown"
  | "SchoolSecondary"
  | "ApartmentMidRise";

export type HeatingFuelTypes = "Electricity" | "Natural Gas" | "Steam";

export type CaseInputSliceTypes = {
  global_inputs: InputCaseTypes[];
  area_inputs: InputAreaTypes[];
};
export type InputAreaTypes = {
  case_id: number;
  area_id: number;
  building_type: BuildingTypeTypes;
  building_area: number;
  heating_fuel: HeatingFuelTypes;
  dhw_fuel: HeatingFuelTypes;
  heating_cop: number;
  dhw_cop: number;
  ashrae_standard: ASHRAEStandardTypes;
};

export type InputCaseTypes = {
  case_id: number;
  hvac_template: string;
  case_name: string;
  location_state: LocationStateTypes;
  climate_zone: ClimateZoneTypes;
  projection_case: string;
};

export type OutputStateTypes = {
  case_results: any[];
  is_loading_error: boolean;
};

export type HvacTemplateTypes = {
  tag: string;
  case_name: string;
  heating_fuel: HeatingFuelTypes;
  heating_cop: number;
};

export type CaseInputParametersPayloadTypes = {
  key: string;
  value: string | number | boolean;
  case_id: number;
};

export type CaseAreaInputParametersPayloadTypes = {
  key: string;
  value: string | number | boolean;
  case_id: number;
  area_id: number;
};

/** ui types **/
export type LinkedAttributeTypes = {
  case_name: boolean;
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

export type QueryDesignAreaTypes = {
  type: BuildingTypeTypes;
  area: number;
  heating_fuel: HeatingFuelTypes;
  dhw_fuel: HeatingFuelTypes;
  heating_cop: number;
  dhw_cop: number;
  cooling_cop?: number;
  ashrae_standard: ASHRAEStandardTypes;
};
export type ProjectionFromReferenceQueryTypes = {
  state: LocationStateTypes;
  climate_zone: ClimateZoneTypes;
  projection_case: string;
  design_areas: QueryDesignAreaTypes[];
};
