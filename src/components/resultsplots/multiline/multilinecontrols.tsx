import OptionToggle from "components/optiontoggle";

import styled from "@mui/styled-engine";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { viewActions } from "store/viewoptionslice";
import { group } from "console";

const MultilineControls = () => {
  const dispatch = useAppDispatch();

  const handleOptionChange = (key: string, val: string) => {
    dispatch(viewActions.setMultilinePlotOptions({ key, val }));
  };

  const { units, grouping } = useAppSelector(
    (state) => state.view_options.plot_options.multiline_plot_options
  );

  return (
    <>
      <OptionToggle
        title="grouping"
        buttons={[
          { key: "total", label: "Total Building CO2" },
          { key: "mep", label: "MEP CO2" },
        ]}
        callback={(d) => {
          handleOptionChange("grouping", d);
        }}
        current_key={grouping}
      />

      <OptionToggle
        title="units"
        buttons={[
          { key: "kg_co2_per_sf", label: "kg CO2e/sf/yr" },
          { key: "kg_co2_absolute", label: "kg CO2e/yr" },
        ]}
        callback={(d) => {
          handleOptionChange("units", d);
        }}
        current_key={units}
      />
    </>
  );
};

export default MultilineControls;
