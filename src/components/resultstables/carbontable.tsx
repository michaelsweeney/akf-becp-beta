import { useAppSelector, useAppDispatch } from "store/hooks";

import { Table, TableBody, TableContainer, TableRow } from "@mui/material";
import { TD } from "styles/components";
import { CarbonTableResultsYearType } from "types";
import { formatNumber } from "dataformat/numberformat";
import { getUniqueKeys } from "dataformat/tableformat";

const CarbonTable = () => {
  const { projection_from_reference_response } = useAppSelector(
    (state) => state.case_outputs
  );

  const { case_inputs } = useAppSelector((state) => state);

  const emissions_key = "emissions_projection";

  const val_key = "kg_co2_per_sf";

  let table_data: CarbonTableResultsYearType[] = [];

  projection_from_reference_response.forEach((d) => {
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

  return (
    <div>
      <TableContainer>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TD variant="head">Year</TD>
              {case_ids.map((id, i) => {
                let case_name = table_data.find((e) => e.case_id === id)
                  ?.case_name as string;
                return (
                  <TD key={i} variant="head">
                    {case_name}
                  </TD>
                );
              })}
            </TableRow>
            {years.map((yr, i) => {
              return (
                <TableRow key={i}>
                  <TD>{yr}</TD>
                  {case_ids.map((id, i) => {
                    let obj = table_data.find(
                      (d) => d.case_id === id && d.year === yr
                    );
                    return <TD key={i}>{obj ? formatNumber(obj.val) : ""}</TD>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default CarbonTable;
