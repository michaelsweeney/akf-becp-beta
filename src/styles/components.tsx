import styled from "styled-components";
import { TableCell, TableRow } from "@mui/material";

import { Button } from "@mui/material";

import { colors } from "./colors";

export const TD = styled(TableCell)<{
  topBorder?: boolean;
  bottomBorder?: boolean;
}>(({ topBorder, bottomBorder }) => ({
  padding: "0px",
  paddingLeft: "5px",
  paddingRight: "5px",
  borderTop: topBorder ? "1px solid black !important" : "",
  borderBottom: bottomBorder ? "1px solid black !important" : "",
}));

export const TDRotate = styled(TD)<{}>(() => ({
  transform: "rotate(-90deg)",
  textAlign: "center",
  width: "50px !important",
}));

export const TR = styled(TableRow)<{
  topBorder?: boolean;
  bottomBorder?: boolean;
}>(({ topBorder, bottomBorder }) => ({
  "& td": {
    borderTop: topBorder ? "1px solid black" : "",
    borderBottom: bottomBorder ? "1px solid black" : "",
  },
}));

//@ts-ignore
export const StyledButton = styled(Button)({
  marginRight: "5px !important",
  marginBottom: "5px !important",
  textTransform: "none !important",
});

export const H1 = styled("span")({
  fontSize: 28,
  fontWeight: 600,
  color: colors.primary,
});

export const H2 = styled("span")({
  fontSize: 24,
  fontWeight: 500,
  color: colors.primary,
});

export const SubHeader = styled("span")({
  fontSize: 18,
  fontWeight: 500,
  color: colors.primary,
});
