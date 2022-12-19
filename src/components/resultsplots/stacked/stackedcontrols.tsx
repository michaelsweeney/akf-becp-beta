import OptionToggle from "components/optiontoggle";
import styled from "@mui/styled-engine";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { viewActions } from "store/viewoptionslice";

const Root = styled("div", { label: "plot-selector" })({
  borderBottom: "1px solid black",
  marginBottom: "10px",
});

const StackedControls = () => {
  const dispatch = useAppDispatch();

  const handleOptionChange = (key: string, val: string) => {
    dispatch(viewActions.setStackedPlotOptions({ key, val }));
  };

  const { units } = useAppSelector(
    (state) => state.view_options.plot_options.stacked_plot_options
  );

  return (
    <Root className="plot-controls-container">
      <OptionToggle
        title="units"
        buttons={[
          { key: "kg_co2_per_sf", label: "not connected" },
          { key: "kg_co2_absolute", label: "not connected" },
        ]}
        callback={(d) => {
          handleOptionChange("units", d);
        }}
        current_key={units}
      />
    </Root>
  );
};

export default StackedControls;
