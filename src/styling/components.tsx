import styled from "@mui/styled-engine";
import { TableCell, TableRow } from "@mui/material";

import { Button } from "@mui/material";
import { colors } from "./colors";

export const TD = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "topBorder" && prop !== "bottomBorder",
})<{}>(() => ({
  padding: "0px",
  paddingLeft: "5px",
  paddingRight: "5px",
}));

export const TDRotate = styled(TD)<{}>(() => ({
  transform: "rotate(-90deg)",
  textAlign: "center",
}));

export const TR = styled(TableRow, {
  shouldForwardProp: (prop) =>
    !["topBorder", "bottomBorder", "topPadding", "bottomPadding"].includes(
      prop
    ),
})<{
  topBorder?: boolean;
  bottomBorder?: boolean;
  topPadding?: boolean;
  bottomPadding?: boolean;
}>(({ topBorder, topPadding, bottomBorder, bottomPadding }) => ({
  "& td": {
    borderTop: topBorder ? "1px solid black" : "",
    borderBottom: bottomBorder ? "1px solid black" : "",
    paddingTop: topPadding ? "10px" : "",
    paddingBottom: bottomPadding ? "10px" : "",
  },
}));

//@ts-ignore
export const StyledButton = styled(Button)({
  borderRadius: "0px",
  boxShadow: "none",
  marginRight: "5px !important",
  marginBottom: "5px !important",
  textTransform: "none !important",
  "&:hover": {
    boxShadow: "none",
  },
});

export const Head1 = styled("span")({
  fontSize: 28,
  fontWeight: 600,
  color: colors.primary,
});

export const Head2 = styled("span")({
  fontSize: 22,
  fontWeight: 500,
  color: colors.primary,
});

export const Head3 = styled("span")({
  fontSize: 18,
  fontWeight: 500,
  color: colors.primary,
});

export const TableTitle = styled(Head3)({
  marginTop: "10px",
  marginBottom: "5px",
});
