import { useAppSelector } from "store/hooks";
import { DataTableHeadTypes, EnduseKeyTypes } from "types";
import DataTable from "../datatable";

import * as d3 from "d3";
import { formatNumber } from "dataformat/numberformat";
import { TableTitle } from "styling/components";

const EnduseSummaryTable = () => {
  const { projection_from_reference_response } = useAppSelector(
    (state) => state.case_outputs
  );

  const { case_attributes } = useAppSelector((state) => state.case_inputs);
  const { case_inputs } = useAppSelector((state) => state);
  const { enduse_table_options } = useAppSelector(
    (state) => state.ui_settings.table_options
  );
  const output_array = projection_from_reference_response;

  let val_key = enduse_table_options.units;

  let enduse_key: EnduseKeyTypes =
    val_key === "kbtu_absolute" ? "enduses_absolute_kbtu" : "enduses_per_sf";

  let case_summary = output_array.map((d) => {
    let enduse_array = d.case_results.enduses[enduse_key];
    let case_name = case_inputs.case_attributes.find(
      (e) => e.case_id === d.case_id
    )?.case_name;

    //@ts-ignore
    let gas = d3.sum(
      enduse_array
        //@ts-ignore
        .filter((d) => d.fuel === "Natural Gas")
        //@ts-ignore
        .map((d) => d[val_key])
    );

    //@ts-ignore
    let elec = d3.sum(
      enduse_array
        //@ts-ignore
        .filter((d) => d.fuel === "Electricity")
        //@ts-ignore
        .map((d) => d[val_key])
    );

    let total = gas + elec;

    return {
      case_id: d.case_id,
      case_name: case_name,
      "Natural Gas": gas,
      Electricity: elec,
      Total: total,
    };
  });

  let headers = [
    "Enduse",
    ...case_summary.map((d) => d.case_name),
  ] as DataTableHeadTypes;

  let row_vals = ["Electricity", "Natural Gas", "Total"].map((rv) => {
    let row: any[] = [];

    row.push(rv);
    //@ts-ignore
    case_summary.forEach((c) => {
      //@ts-ignore
      row.push(formatNumber(c[rv]));
    });
    return row;
  });

  return (
    <div>
      <TableTitle>{`End Use Summary, ${
        val_key === "kbtu_absolute" ? "kbtu/yr" : "kbtu/sf/yr"
      }`}</TableTitle>
      <DataTable headers={headers} table_data={row_vals} last_row_bold={true} />
    </div>
  );
};

export default EnduseSummaryTable;
