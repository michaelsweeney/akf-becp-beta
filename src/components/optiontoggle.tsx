import styled from "@mui/styled-engine";
import { StyledButton } from "styles/components";
import { SubHeader } from "styles/components";

interface PropTypes {
  title: string;
  buttons: { key: string; label: string }[];
  callback: (e: string) => void;
  current_key: string;
}

const GroupWrapper = styled("div")({
  display: "inline-block",
  padding: 10,
  margin: 5,
});

const ButtonWrapper = styled("div")({
  textAlign: "center",
  display: "inline-block",
});

const TitleWrapper = styled("div")({
  display: "block",
  textAlign: "center",
  marginBottom: 5,
});

const OptionToggle = (props: PropTypes) => {
  return (
    <GroupWrapper>
      <TitleWrapper>
        <SubHeader>{props.title}</SubHeader>
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
    </GroupWrapper>
  );
};

export default OptionToggle;
