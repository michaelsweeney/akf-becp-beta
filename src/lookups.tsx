import {
  HvacTemplateTypes,
  ClimateZoneTypes,
  CoefficientCaseTypes,
  LocationStateTypes,
  ASHRAEStandardTypes,
  BuildingTypeTypes,
  HeatingFuelTypes,
} from "./types";

export const location_states: LocationStateTypes[] = [
  "AL",
  "AR",
  "AZ",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "IA",
  "ID",
  "IL",
  "IN",
  "KS",
  "KY",
  "LA",
  "MA",
  "MD",
  "ME",
  "MI",
  "MN",
  "MO",
  "MS",
  "MT",
  "NC",
  "ND",
  "NE",
  "NH",
  "NJ",
  "NM",
  "NV",
  "NY",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VA",
  "VT",
  "WA",
  "WI",
  "WV",
  "WY",
];

export const climate_zones: ClimateZoneTypes[] = [
  "1A",
  "2A",
  "2B",
  "3A",
  "3B",
  "3C",
  "4A",
  "4B",
  "4C",
  "5A",
  "5B",
  "6A",
  "6B",
  "7",
];

export const coefficient_cases: CoefficientCaseTypes[] = [
  "HighRECost",
  "LowRECost",
  "MidCase",
  "MidCase95by2035",
  "MidCase95by2050",
  "BERDO",
];

export const ashrae_standards: ASHRAEStandardTypes[] = [
  "STD2013",
  "STD2016",
  "STD2019",
];

export const building_types: BuildingTypeTypes[] = [
  "OfficeLarge",
  "OfficeSmall",
  "Hospital",
  "OfficeMedium",
  "SchoolPrimary",
  "HotelSmall",
  "HotelLarge",
  "RetailStandalone",
  "RetailStripmall",
  "ApartmentHighRise",
  "RestaurantFastFood",
  "Warehouse",
  "RestaurantSitDown",
  "SchoolSecondary",
  "ApartmentMidRise",
];

export const heating_fuels: HeatingFuelTypes[] = ["Electricity", "Natural Gas"];

export const hvac_templates: HvacTemplateTypes[] = [
  {
    tag: "elec_ashp",
    case_name: "Air Source HP",
    heating_fuel: "Electricity",
    heating_cop: 3.2,
  },
  {
    tag: "elec_resistance",
    case_name: "Electric Resistance",
    heating_fuel: "Electricity",
    heating_cop: 1,
  },
  {
    tag: "ng_furnace",
    case_name: "NG Heating",
    heating_fuel: "Natural Gas",
    heating_cop: 0.8,
  },
  {
    tag: "vrf",
    case_name: "VRF",
    heating_fuel: "Electricity",
    heating_cop: 4.45,
  },
  {
    tag: "gshp",
    case_name: "GSHP",
    heating_fuel: "Electricity",
    heating_cop: 4.95,
  },
];

type DataMap = {
  [key: string]: string;
};

export const ref_bldg_to_berdo_type: DataMap = {
  SchoolSecondary: "education",
  OfficeMedium: "office",
  SchoolPrimary: "education",
  RetailStripmall: "retail",
  RestaurantFastFood: "food_sales_service",
  HotelSmall: "lodging",
  ApartmentMidRise: "multifamily_housing",
  Warehouse: "storage",
  RetailStandalone: "retail",
  OfficeSmall: "office",
  RestaurantSitDown: "food_sales_service",
  OfficeLarge: "office",
  HotelLarge: "lodging",
  Hospital: "healthcare",
  ApartmentHighRise: "multifamily_housing",
};

export const ref_bldg_to_ll97_type: DataMap = {
  SchoolSecondary: "E",
  OfficeMedium: "B_norm",
  SchoolPrimary: "E",
  RetailStripmall: "B_norm",
  RestaurantFastFood: "B_norm",
  HotelSmall: "R1",
  ApartmentMidRise: "R2",
  Warehouse: "S",
  RetailStandalone: "B_norm",
  OfficeSmall: "B_norm",
  RestaurantSitDown: "B_norm",
  OfficeLarge: "B_norm",
  HotelLarge: "B_norm",
  Hospital: "B_health",
  ApartmentHighRise: "R2",
};
