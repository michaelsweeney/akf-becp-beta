import OptionToggle from "components/optiontoggle";
import styled from "@mui/styled-engine";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { uiActions } from "store/uislice";

const Root = styled("div", { label: "plot-selector" })({
  borderBottom: "1px solid black",
  marginBottom: "10px",
});

const StackedControls = () => {
  return (
    <Root className="plot-controls-container">
      <OptionToggle
        title="units"
        buttons={[
          { key: "kg_co2_per_sf", label: "not connected" },
          { key: "kg_co2_absolute", label: "not connected" },
        ]}
        callback={(d) => {}}
        current_key={"kg_co2_absolute"}
      />
    </Root>
  );
};

export default StackedControls;
