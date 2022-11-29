import InputForm from "components/inputform";
import { uiActions } from "store/uislice";

import { useAppSelector, useAppDispatch } from "store/hooks";
import { Drawer, Button } from "@mui/material";
import { useEffect, useRef } from "react";
import { arrow_back, IconSvg } from "./svgicons";
import { colors } from "../styles/colors";

import { Title, StyledButton } from "styles/components";
import styled from "@mui/styled-engine";

const DrawerContainer = styled("div")({
  height: "100%",
  backgroundColor: "rgba(200,200,200,0.5)",
  borderRight: "1px solid black",
});

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const ref = useRef(null);

  const { sidebar_open } = useAppSelector((state) => state.ui_settings);
  const { case_inputs } = useAppSelector((state) => state);

  const getSidebarWidth = () => {
    if (ref.current !== null) {
      //@ts-ignore
      let dims = ref.current.children[0].getBoundingClientRect();
      let { width } = dims;
      if (!sidebar_open) {
        width = 0;
      }
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
    <Drawer
      hideBackdrop={true}
      onClose={handleClose}
      open={sidebar_open}
      anchor="left"
      variant="persistent"
      ref={ref}
    >
      <DrawerContainer>
        <StyledButton onClick={handleClose}>
          <IconSvg fill={colors.primary} d={arrow_back} />
        </StyledButton>
        <Title>Building Inputs</Title>
        <InputForm />
      </DrawerContainer>
    </Drawer>
  );
};

export default Sidebar;
