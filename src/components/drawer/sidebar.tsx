import { uiActions } from "store/uislice";

import { useAppSelector, useAppDispatch } from "store/hooks";

import { useEffect, useRef } from "react";
import { arrow_back, IconSvg } from "components/svgicons";
import { colors } from "styling/colors";

import styled from "@mui/styled-engine";
import { Button } from "@mui/material";
import { StyledButton } from "styling/components";

type SidebarPropTypes = {
  height: number;
  component: JSX.Element | JSX.Element[];
};

type DrawerContainerPropTypes = {
  open: boolean;
  sidebarWidth: number;
  sidebarHeight: number;
};

const DrawerContainer = styled("div")<DrawerContainerPropTypes>((props) => ({
  backgroundColor: colors.sidebar_background,
  padding: "15px",
  borderRight: "2px solid black",
  boxSizing: "border-box",
  position: "absolute",
  height: props.sidebarHeight,
  overflowY: "auto",
  left: props.open ? "0px" : `-${props.sidebarWidth}px`,
  transition: "left 250ms",
}));

const CloseButtonWrapper = styled(StyledButton)({
  display: "inline-block",
  position: "absolute",
  left: "5px",
  top: "5px",
  minWidth: "25px !important",
  // backgroundColor: "red !important",
  "& div": {
    position: "relative",
    left: "5px",
    top: "4px",
    minWidth: "25px !important",
    // backgroundColor: "yellow !important",
  },

  // backgroundColor: "red !important",
});

const ComponentWrapper = styled("div")({
  position: "relative",
});

const Sidebar = (props: SidebarPropTypes) => {
  const { height, component } = props;

  const dispatch = useAppDispatch();
  const ref = useRef(null);

  const { sidebar_open, sidebar_width } = useAppSelector(
    (state) => state.ui_settings
  );
  const { case_inputs } = useAppSelector((state) => state);

  const getSidebarWidth = () => {
    if (ref.current !== null) {
      //@ts-ignore
      let dims = ref.current.getBoundingClientRect();
      let { width } = dims;

      dispatch(uiActions.setSidebarWidth(width as number));
    }
  };

  const handleClose = () => {
    dispatch(uiActions.setSidebarOpen(false));
  };

  useEffect(() => {
    setTimeout(() => {
      getSidebarWidth();
    }, 0);
  }, [case_inputs, sidebar_open]);

  return (
    <DrawerContainer
      open={sidebar_open}
      sidebarWidth={sidebar_width}
      ref={ref}
      sidebarHeight={height}
    >
      <ComponentWrapper>{component}</ComponentWrapper>
      <CloseButtonWrapper onClick={handleClose}>
        <IconSvg fill={colors.primary} d={arrow_back} />
      </CloseButtonWrapper>
    </DrawerContainer>
  );
};

export default Sidebar;
