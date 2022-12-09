import styled from "@mui/styled-engine";

import { H1 } from "styles/components";

const LogoContainer = styled("div")({
  display: "inline-block",
  float: "right",
  verticalAlign: "center",
  marginRight: "10px",
  padding: 10,
});

const TitleContainer = styled("div")((props) => ({
  display: "inline-block",
  padding: "12px",
  transition: "margin 250ms",
}));

const HeaderContainer = styled("div")<{ height: number }>((props) => ({
  width: "100%",
  padding: "10px",
  height: `${props.height}px`,
  borderBottom: "2px solid black",
  boxSizing: "border-box",
  whiteSpace: "nowrap",
  overflow: "hidden",
}));

const Header = (props: { height: number }) => {
  return (
    <HeaderContainer height={props.height}>
      <TitleContainer>
        <H1>Building Operational Carbon Projection Tool [beta]</H1>
      </TitleContainer>

      <LogoContainer>
        <img alt="akf logo" src="akf-logo.png" width="80" />
      </LogoContainer>
    </HeaderContainer>
  );
};

export default Header;