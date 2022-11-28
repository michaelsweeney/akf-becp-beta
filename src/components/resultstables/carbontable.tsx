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
  TableRow,
} from "@mui/material";
import { TD } from "styles/components";

interface PropTypes {}
const TemplateStyle = styled("div")<{}>(() => ({}));
const CarbonTable = (props: PropTypes) => {
  const { projection_from_reference_response } = useAppSelector(
    (state) => state.case_outputs
  );

  console.log(projection_from_reference_response);

  const dispatch = useAppDispatch();
  return <div>Carbon</div>;
};
export default CarbonTable;
