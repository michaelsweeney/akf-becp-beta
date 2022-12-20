import styled from "@mui/styled-engine";
import { OptionToggleButton } from "styling/components";
import { Head3 } from "styling/components";

interface PropTypes {
  title: string;
  buttons: { key: string; label: string }[];
  callback: (e: string) => void;
  current_key: string;
}

const Wrapper = styled("div")({
  padding: 5,
  display: "inline-block",
  marginRight: 10,
  marginBottom: 10,
  backgroundColor: "rgba(0,0,0,0.05)",
  border: "1px solid black",
});

const ButtonWrapper = styled("div")({
  display: "inline-block",
  verticalAlign: "middle",
});

const TitleText = styled(Head3)({
  fontSize: "12px",

  fontWeight: 700,
  marginRight: 10,
  marginLeft: 5,
});

const OptionToggle = (props: PropTypes) => {
  return (
    <Wrapper>
      <TitleText>{props.title}</TitleText>
      {props.buttons.map((d, i) => {
        return (
          <ButtonWrapper key={i}>
            <OptionToggleButton
              color="primary"
              variant={props.current_key === d.key ? "contained" : "outlined"}
              size="small"
              onClick={() => props.callback(d.key)}
            >
              {d.label}
            </OptionToggleButton>
          </ButtonWrapper>
        );
      })}
    </Wrapper>
  );
};

export default OptionToggle;
