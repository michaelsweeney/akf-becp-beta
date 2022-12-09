import styled from "@mui/styled-engine";
import { useAppDispatch, useAppSelector } from "store/hooks";

import { Table, TableBody, TableContainer, TableRow } from "@mui/material";
import { TD } from "styles/components";
import {
  ProjectionFromReferenceOutputTypes,
  EnduseTableFlatResultsObject,
  EnduseKeyTypes,
} from "types";

import { SubHeader } from "styles/components";

import { formatNumber } from "dataformat/numberformat";
import { getUniqueKeys } from "dataformat/tableformat";

const TitleWrapper = styled("div")({
  marginTop: "10px",
  marginBottom: "5px",
});

const EnduseTable = () => {
  const { projection_from_reference_response } = useAppSelector(
    (state) => state.case_outputs
  );

  const { case_inputs } = useAppSelector((state) => state);
  const { enduse_table_options } = useAppSelector((state) => state.ui_settings);
  const output_array = projection_from_reference_response;

  // constants to be pulled out into state options and/or lookups

  let val_key = enduse_table_options.units;
  let groupby_key = enduse_table_options.groupby;

  let enduse_key: EnduseKeyTypes =
    val_key === "kbtu_absolute" ? "enduses_absolute_kbtu" : "enduses_per_sf";

  let enduse_results_flat: EnduseTableFlatResultsObject[] = [];
  let enduse_table_array: EnduseTableFlatResultsObject[][] = [];

  let output_count = output_array.length;
  let input_count = case_inputs.case_attributes.length;

  if (output_count !== 0 && input_count === output_count) {
    let unique_case_ids = getUniqueKeys(
      case_inputs.case_attributes,
      "case_id"
    ) as number[];

    unique_case_ids.forEach((case_id) => {
      let case_name = case_inputs.case_attributes.find(
        (d) => d.case_id === case_id
      )?.case_name as string;

      let case_outputs = output_array.find(
        (d) => d.case_id === case_id
      ) as ProjectionFromReferenceOutputTypes;

      let enduses = case_outputs?.case_results.enduses[enduse_key];

      enduses.forEach((enduse) => {
        enduse_results_flat.push({
          subcategory_combined:
            enduse.enduse + "_" + enduse.subcategory + "_" + enduse.fuel,
          case_name: case_name,
          case_id: case_id,
          enduse: enduse.enduse,
          subcategory: enduse.subcategory,
          fuel: enduse.fuel,
          //@ts-ignore
          val: enduse[val_key as keyof typeof enduse],
        });
      });
    });

    let enduses_unique = getUniqueKeys(
      enduse_results_flat,
      groupby_key
    ) as string[];

    enduses_unique.forEach((enduse) => {
      let row: EnduseTableFlatResultsObject[] = [];

      unique_case_ids.forEach((case_id) => {
        let case_name = case_inputs.case_attributes.find(
          (d) => d.case_id === case_id
        )?.case_name as string;

        let obj = enduse_results_flat.find(
          (d) =>
            d[groupby_key as keyof typeof d] === enduse &&
            d.case_name === case_name
        ) as EnduseTableFlatResultsObject;

        if (obj !== undefined) {
          row.push(obj);
        } else {
          let blank_template_obj = {
            ...(enduse_results_flat.find(
              (d) => d[groupby_key as keyof typeof d] === enduse
            ) as EnduseTableFlatResultsObject),
          };
          blank_template_obj.val = 0;
          blank_template_obj.case_id = case_id;
          blank_template_obj.case_name = case_name;
          row.push(blank_template_obj);
        }
      });
      enduse_table_array.push(row);
    });
  }

  return (
    <div>
      <TitleWrapper>
        <SubHeader>{`End Use Table, ${
          val_key === "kbtu_absolute" ? "kbtu/yr" : "kbtu/sf/yr"
        } (grouped by ${
          groupby_key === "enduse" ? "end use" : "subcategory"
        })`}</SubHeader>
      </TitleWrapper>
      <TableContainer>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TD variant="head">Enduse</TD>
              <TD variant="head">Fuel</TD>
              <TD variant="head">Subcategory</TD>

              {case_inputs.case_attributes.map((d, i) => (
                <TD key={i} variant="head">
                  {d.case_name}
                </TD>
              ))}
            </TableRow>

            {enduse_table_array.map((row, i) => {
              return (
                <TableRow key={i}>
                  <TD>{row[0].enduse}</TD>
                  <TD>{row[0].fuel}</TD>
                  <TD>{row[0].subcategory}</TD>
                  {row.map((d, i) => {
                    return <TD key={i}>{formatNumber(d.val)}</TD>;
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

export default EnduseTable;
