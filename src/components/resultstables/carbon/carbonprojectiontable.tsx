import { useAppSelector } from "store/hooks";

import { TableTitle } from "styling/components";
import { CarbonTableProjectionResultsYearType, DataTableTypes } from "types";
import { formatNumber } from "dataformat/numberformat";
import { getUniqueKeys } from "dataformat/tableformat";

import DataTable from "../datatable";

const CarbonTable = () => {
  const { output_response } = useAppSelector((state) => state.case_outputs);

  const { case_inputs } = useAppSelector((state) => state);
  const { carbon_projection_table_options } = useAppSelector(
    (state) => state.ui_settings.table_options
  );

  const emissions_key = "emissions_projection";
  const val_key = carbon_projection_table_options.units;

  let table_data: CarbonTableProjectionResultsYearType[] = [];

  output_response.forEach((d) => {
    let { case_id, case_results } = d;

    let case_name = case_inputs.case_attributes.find(
      (d) => d.case_id === case_id
    )?.case_name as string;

    let data = case_results[emissions_key];

    data.forEach((d) => {
      table_data.push({
        case_id: case_id,
        case_name: case_name,
        key: val_key,
        year: d.year,
        val: d[val_key as keyof typeof d],
      });
    });
  });

  let case_ids = getUniqueKeys(table_data, "case_id") as number[];
  let years = getUniqueKeys(table_data, "year") as number[];

  const header_items = [
    "Year",
    ...case_ids.map((id, i) => {
      let case_name = table_data.find((e) => e.case_id === id)
        ?.case_name as string;
      return case_name;
    }),
  ];

  let row_data: (string | number)[][] = [];
  years.forEach((yr) => {
    let row: (string | number)[] = [];
    row.push(yr);
    case_ids.forEach((id) => {
      let obj = table_data.find((d) => d.case_id === id && d.year === yr);
      row.push(obj ? formatNumber(obj.val) : "");
    });
    row_data.push(row);
  });

  return (
    <div>
      <TableTitle>{`Carbon Projection (all years), ${
        val_key === "kg_co2_absolute" ? "kg CO2e/yr" : "kg CO2e/sf/yr"
      }`}</TableTitle>

      <DataTable headers={header_items} table_data={row_data} />
    </div>
  );
};
export default CarbonTable;
