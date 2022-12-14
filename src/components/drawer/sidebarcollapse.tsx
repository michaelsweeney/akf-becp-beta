import { useRef, useEffect } from "react";

import { useAppSelector, useAppDispatch } from "store/hooks";
import { uiActions } from "store/uislice";
import styled from "@mui/styled-engine";
import { StyledButton } from "styling/components";
import { colors } from "styling/colors";
import { arrow_forward, IconSvg } from "components/svgicons";

type SidebarCollapseTypes = {
  height: number;
};

type WrapperProps = {
  sidebar_open: boolean;
  height: number;
};

const ButtonWrapper = styled(StyledButton)({
  position: "relative",
  left: "2.5px !important",
  top: "2.5px !important",
});

const SidebarCollapseWrapper = styled("div")<WrapperProps>(
  (props: WrapperProps) => ({
    display: "inline-block",
    position: "absolute",
    left: props.sidebar_open ? "-999px" : "0px",
    height: props.height,
    transition: "left 250ms",
    borderRight: "2px solid black",
    backgroundColor: colors.sidebar_background,
  })
);

const SidebarCollapse = (props: SidebarCollapseTypes) => {
  const dispatch = useAppDispatch();
  const ref = useRef(null);

  const { sidebar_open, sidebar_collapse_width } = useAppSelector(
    (state) => state.ui_settings
  );

  const getSidebarCollapseWidth = () => {
    if (ref.current !== null) {
      //@ts-ignore
      let dims = ref.current.getBoundingClientRect();
      let { width } = dims;
      dispatch(uiActions.setSidebarCollapseWidth(width as number));
    }
  };

  const toggleSidebarOpen = () => {
    dispatch(uiActions.setSidebarOpen(!sidebar_open));
  };

  useEffect(() => {
    getSidebarCollapseWidth();
  }, [sidebar_collapse_width]);

  return (
    <SidebarCollapseWrapper
      ref={ref}
      sidebar_open={sidebar_open}
      height={props.height}
    >
      <ButtonWrapper
        sx={{ minWidth: "5px !important" }}
        size="small"
        onClick={toggleSidebarOpen}
      >
        <IconSvg fill={colors.primary} d={arrow_forward} />
      </ButtonWrapper>
    </SidebarCollapseWrapper>
  );
};

export default SidebarCollapse;
