import styled from "@mui/styled-engine";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { uiActions } from "store/uislice";
import { CurrentViewTypes } from "types";
import { Button } from "@mui/material";

interface PropTypes {}

const Root = styled("div")({
  borderBottom: "1px solid black",
  paddingBottom: "5px",
  padding: "15px",
});
const ButtonWrapper = styled(Button)({
  marginLeft: "10px !important",
  marginTop: "5px !important",
});

const ViewSelector = (props: PropTypes) => {
  const dispatch = useAppDispatch();

  const { current_view } = useAppSelector((state) => state.ui_settings);
  const handleSetCurrentView = (vtype: CurrentViewTypes) => {
    dispatch(uiActions.setCurrentView(vtype));
  };

  return (
    <Root>
      <ButtonWrapper
        variant={current_view === "enduse" ? "contained" : "outlined"}
        onClick={() => {
          handleSetCurrentView("enduse");
        }}
      >
        enduses
      </ButtonWrapper>
      <ButtonWrapper
        variant={current_view === "carbon" ? "contained" : "outlined"}
        onClick={() => {
          handleSetCurrentView("carbon");
        }}
      >
        carbon
      </ButtonWrapper>
    </Root>
  );
};
export default ViewSelector;
