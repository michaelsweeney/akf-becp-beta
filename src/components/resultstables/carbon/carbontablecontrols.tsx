import styled from "@mui/styled-engine";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { uiActions } from "store/uislice";

import OptionToggle from "components/optiontoggle";
const Root = styled("div")({
  borderBottom: "1px solid black",
  marginBottom: "10px",
});
const CarbonTableControls = () => {
  const dispatch = useAppDispatch();
  const {
    carbon_projection_table_options: { units },
  } = useAppSelector((state) => state.ui_settings);

  const handleOptionChange = (key: string, val: string) => {
    dispatch(uiActions.setCarbonTableOptions({ key, val }));
  };

  return (
    <Root>
      <OptionToggle
        title="units"
        buttons={[
          { key: "kg_co2_per_sf", label: "kg CO2e/sf/yr" },
          { key: "kg_co2_absolute", label: "kg CO2e/yr" },
        ]}
        callback={(d) => handleOptionChange("units", d)}
        current_key={units}
      />
    </Root>
  );
};
export default CarbonTableControls;

// | "kg_co2_per_sf"
// | "kg_co2_absolute";
