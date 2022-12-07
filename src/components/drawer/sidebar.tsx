import { uiActions } from "store/uislice";

import { useAppSelector, useAppDispatch } from "store/hooks";

import { useEffect, useRef } from "react";
import { arrow_back, IconSvg } from "components/svgicons";
import { colors } from "styles/colors";

import { StyledButton } from "styles/components";
import styled from "@mui/styled-engine";

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
  borderRight: "1px solid black",
  position: "absolute",
  height: props.sidebarHeight,
  overflowY: "auto",
  left: props.open ? "0px" : `-${props.sidebarWidth + 50}px`,
  transition: "left 250ms",
}));

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
    getSidebarWidth();
  }, [sidebar_open, case_inputs]);

  return (
    <DrawerContainer
      open={sidebar_open}
      sidebarWidth={sidebar_width}
      ref={ref}
      sidebarHeight={height}
    >
      <StyledButton onClick={handleClose}>
        <IconSvg fill={colors.primary} d={arrow_back} />
      </StyledButton>
      {component}
    </DrawerContainer>
  );
};

export default Sidebar;
