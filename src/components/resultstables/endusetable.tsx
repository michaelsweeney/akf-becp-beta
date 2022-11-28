import styled from "@mui/styled-engine";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { caseInputActions } from "store/caseinputslice";
import { uiActions } from "store/uislice";
import { caseOutputSlice } from "store/caseoutputslice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TD } from "styles/components";

interface PropTypes {}

const TemplateStyle = styled("div")<{}>(() => ({}));

const EnduseTable = (props: PropTypes) => {
  const dispatch = useAppDispatch();
  const { projection_from_reference_response } = useAppSelector(
    (state) => state.case_outputs
  );

  const { case_inputs } = useAppSelector((state) => state);

  const output_array = projection_from_reference_response;

  // map case_name to output_array...
  // reorder function for case ids.

  /* 
  this fails, but it seems like there's a typing issue between what typescript
  assumes and what api returns.
  <TD>{d.case_results.enduses.enduses_per_sf.area}</TD>
  */

  console.log(output_array);
  return (
    <div>
      Enduses...
      <TableContainer>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TD>case id</TD>
              {output_array.map((d, i) => (
                <TD key={i}>{d.case_id}</TD>
              ))}
            </TableRow>
            <TableRow>
              <TD>area</TD>
              {output_array.map((d, i) => (
                <TD key={i}>{d.case_results.enduses.area}</TD>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EnduseTable;
