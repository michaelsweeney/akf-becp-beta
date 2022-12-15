import styled from "@mui/styled-engine";
import { StyledButton } from "styling/components";
import { Head3 } from "styling/components";

interface PropTypes {
  title: string;
  buttons: { key: string; label: string }[];
  callback: (e: string) => void;
  current_key: string;
}

const Wrapper = styled("div")({
  display: "inline-block",
  // padding: 10,
  marginRight: 10,
});

const ButtonWrapper = styled("div")({
  textAlign: "center",
  display: "inline-block",
});

const TitleWrapper = styled("div")({
  display: "block",
  // textAlign: "center",
  marginBottom: 5,
});

const TitleText = styled(Head3)({
  fontSize: "14px",
});

const OptionToggle = (props: PropTypes) => {
  return (
    <Wrapper>
      <TitleWrapper>
        <TitleText>{props.title}</TitleText>
      </TitleWrapper>
      {props.buttons.map((d, i) => {
        return (
          <ButtonWrapper key={i}>
            <StyledButton
              color="primary"
              variant={props.current_key === d.key ? "contained" : "outlined"}
              size="small"
              onClick={() => props.callback(d.key)}
            >
              {d.label}
            </StyledButton>
          </ButtonWrapper>
        );
      })}
    </Wrapper>
  );
};

export default OptionToggle;
