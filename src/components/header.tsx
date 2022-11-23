import styled from "@mui/styled-engine";

import { Button } from "@mui/material";
import { IconSvg, arrow_forward } from "./svgicons";
import { colors } from "./styles/colors";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { uiActions } from "store/uislice";

const HeaderContainer = styled("div")({
  width: "100%",
  height: "50px",
});

const ButtonContainer = styled("div")({
  display: "inline-block",
  padding: "10px",
});

const LogoContainer = styled("div")({
  display: "inline-block",
  float: "right",
  padding: 10,
});

const TitleContainer = styled("div")<{ sidebar_width: number }>((props) => ({
  display: "inline-block",
  marginLeft: props.sidebar_width,
  transition: "margin 250ms",
}));

const Title = styled("div")({
  fontSize: 24,
});

const Header = () => {
  const dispatch = useAppDispatch();
  const { sidebar_open, sidebar_width } = useAppSelector(
    (state) => state.ui_settings
  );

  const toggleSidebar = () => {
    dispatch(uiActions.setSidebarOpen(!sidebar_open));
  };

  return (
    <HeaderContainer>
      <ButtonContainer>
        <Button onClick={toggleSidebar}>
          <IconSvg fill={colors.primary} d={arrow_forward} />
        </Button>
      </ButtonContainer>

      <TitleContainer sidebar_width={sidebar_width}>
        <Title>Operational Carbon Tool</Title>
      </TitleContainer>

      <LogoContainer>
        <img alt="akf logo" src="akf-logo.png" width="80" />
      </LogoContainer>
    </HeaderContainer>
  );
};

export default Header;
