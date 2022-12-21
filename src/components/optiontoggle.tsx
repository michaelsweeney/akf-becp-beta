import styled from "@mui/styled-engine";
import { OptionToggleButton } from "styling/components";
import OptionContainer from "./optioncontainer";

interface PropTypes {
  title: string;
  buttons: { key: string; label: string }[];
  callback: (e: string) => void;
  current_key: string;
}

const ButtonWrapper = styled("div")({
  display: "inline-block",
  verticalAlign: "middle",
});

const OptionToggle = (props: PropTypes) => {
  return (
    <OptionContainer
      title={props.title}
      children={props.buttons.map((d, i) => {
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
    />
  );
};

export default OptionToggle;
