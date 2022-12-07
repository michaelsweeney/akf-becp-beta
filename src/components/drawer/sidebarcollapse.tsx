import { useRef, useEffect } from "react";

import { useAppSelector, useAppDispatch } from "store/hooks";
import { uiActions } from "store/uislice";
import styled from "@mui/styled-engine";
import { StyledButton } from "styles/components";
import { colors } from "styles/colors";
import { arrow_forward, IconSvg } from "components/svgicons";

type SidebarCollapseTypes = {
  height: number;
};

type WrapperProps = {
  sidebar_open: boolean;
  height: number;
};

const SidebarCollapseWrapper = styled("div")<WrapperProps>(
  (props: WrapperProps) => ({
    display: "inline-block",
    position: "absolute",
    left: props.sidebar_open ? "-999px" : "0px",
    height: props.height,
    transition: "left 250ms",
    borderRight: "1px solid black",
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
      <StyledButton
        sx={{ minWidth: "5px !important" }}
        size="small"
        onClick={toggleSidebarOpen}
      >
        <IconSvg fill={colors.primary} d={arrow_forward} />
      </StyledButton>
    </SidebarCollapseWrapper>
  );
};

export default SidebarCollapse;
