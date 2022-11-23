import styled from "styled-components";
import { TableCell } from "@mui/material";

import { Button } from "@mui/material";

export const TD = styled(TableCell)<{}>(() => ({
  padding: "0px",
  paddingLeft: "5px",
  paddingRight: "5px",
}));

export const TDRotate = styled(TD)<{}>(() => ({
  transform: "rotate(-90deg)",
  textAlign: "center",
  width: "50px",
}));

export const StyledButton = styled(Button)<{}>(() => ({ margin: "10px" }));

export const Title = styled("span")({
  fontSize: 24,
});
