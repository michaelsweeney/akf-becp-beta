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
  | "7";

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

export type HvacTemplateTagTypes =
  | "elec_ashp"
  | "elec_resistance"
  | "ng_furnace"
  | "vrf"
  | "gshp";

export type CaseAttributeTypes = {
  case_name: string;
  case_id: number;
  hvac_template: HvacTemplateTagTypes;
  template_overridden: boolean;
};

export type CaseInputSliceTypes = {
  case_attributes: CaseAttributeTypes[];
  api_inputs: {
    global: InputCaseTypes[];
    areas: InputAreaTypes[];
  };
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
  location_state: LocationStateTypes;
  climate_zone: ClimateZoneTypes;
  projection_case: string;
};

export type CaseOutputSliceTypes = {
  projection_from_reference_response: ProjectionFromReferenceOutputTypes[];
};

export type HvacTemplateTypes = {
  tag: HvacTemplateTagTypes;
  case_name: string;
  heating_fuel: HeatingFuelTypes | null;
  heating_cop: number | null;
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

export type WindowDimensionTypes = {
  height: number;
  width: number;
};

export type CurrentViewTypes = "enduse" | "carbon";
export type UiSliceTypes = {
  linked_attributes: LinkedAttributeTypes;
  sidebar_open: boolean;
  sidebar_width: number;
  window_dimensions: WindowDimensionTypes;
  sidebar_ref: HTMLDivElement | null;
  is_api_loading: boolean;
  current_view: CurrentViewTypes;
};

export type CaseResultsTypes = {
  emissions_projection: {
    elec_kg_per_kbtu: number;
    kg_co2_absolute: number;
    kg_co2_per_sf: number;
    year: number;
  }[];

  emissions_projection_by_fuel: {
    elec_kg_per_kbtu: number;
    fuel: string;
    kg_co2_per_sf: number;
    year: number;
  }[];

  enduses: {
    area: number;
    enduses_absolute_kbtu: {
      enduse: string;
      fuel: string;
      kbtu_absolute: number;
      subcategory: string;
    }[];
    enduses_per_sf: {
      area: number;
      enduses_absolute_kbtu: {
        enduse: string;
        fuel: string;
        kbtu_absolute: number;
        subcategory: string;
      }[];
    };
  };
  projection_factors: {
    case: string;
    lrmer_co2e_kg_mwh: number;
    state: string;
    year: number;
  }[];
};

export type LL97ResultsTypes = {
  annual_building_carbon_tons: number;
  annual_penalties: { penalty: number; period: string }[];
  carbon_above_thresholds: { val: number; period: string }[];
  emissions_thresholds: { val: number; period: string }[];
  emissions_thresholds_per_sf: { val: number; period: string }[];
};

export type BERDOResultsTypes = {
  acp_payments: { year: number; val: number }[];
  annual_building_carbon_kg: { year: number; val: number }[];
  carbon_above_thresholds: { year: number; val: number }[];
  emissions_thresholds: { period: string; val: number }[];
  emissions_thresholds_per_sf: { period: string; val: number }[];
};

export type ProjectionFromReferenceOutputTypes = {
  berdo_results: BERDOResultsTypes;
  ll97_results: LL97ResultsTypes;
  case_id: number;
  case_results: CaseResultsTypes;
};
