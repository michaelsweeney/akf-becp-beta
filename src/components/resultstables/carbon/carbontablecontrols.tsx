import styled from "@mui/styled-engine";
import { useAppSelector, useAppDispatch } from "store/hooks";

import OptionToggle from "components/optiontoggle";
import { viewActions } from "store/viewoptionslice";
const Root = styled("div")({
  borderBottom: "1px solid black",
  marginBottom: "10px",
});
const CarbonTableControls = () => {
  const dispatch = useAppDispatch();
  const {
    carbon_projection_table_options: { units },
  } = useAppSelector((state) => state.view_options.table_options);

  const handleOptionChange = (key: string, val: string) => {
    dispatch(viewActions.setCarbonTableOptions({ key, val }));
  };

  return (
    <OptionToggle
      title="units"
      buttons={[
        { key: "kg_co2_per_sf", label: "kg CO2e/sf/yr" },
        { key: "kg_co2_absolute", label: "kg CO2e/yr" },
      ]}
      callback={(d) => handleOptionChange("units", d)}
      current_key={units}
    />
  );
};
export default CarbonTableControls;

// | "kg_co2_per_sf"
// | "kg_co2_absolute";
