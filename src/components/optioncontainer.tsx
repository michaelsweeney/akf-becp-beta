import styled from "@mui/styled-engine";
import { Head3Bold } from "styling/components";

const Root = styled("div")({
  display: "inline-block",
  padding: 5,
  marginRight: 10,
  verticalAlign: "middle",
  marginBottom: 10,
  backgroundColor: "rgba(0,0,0,0.05)",
  border: "1px solid black",
});

const Inner = styled("div")({
  display: "table",
  height: "35px",
});

const TitleText = styled(Head3Bold)({
  display: "table-cell",
  fontSize: "12px",
  paddingLeft: 5,
  paddingRight: 5,
  height: "100%",
  verticalAlign: "middle",
});

const ChildrenContainer = styled("span")({
  display: "table-cell",
  verticalAlign: "middle",
});

interface PropTypes {
  title: string;
  children: JSX.Element | JSX.Element[];
}

const OptionContainer = (props: PropTypes) => {
  return (
    <Root>
      <Inner>
        <TitleText>{props.title}</TitleText>
        <ChildrenContainer>{props.children}</ChildrenContainer>
      </Inner>
    </Root>
  );
};

export default OptionContainer;
