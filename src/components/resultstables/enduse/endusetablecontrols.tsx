import styled from "@mui/styled-engine";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { uiActions } from "store/uislice";

import OptionToggle from "components/optiontoggle";
const Root = styled("div")({
  borderBottom: "1px solid black",
  marginBottom: "5px",
});
const EnduseTableControls = () => {
  const dispatch = useAppDispatch();
  const {
    enduse_table_options: { groupby, units },
  } = useAppSelector((state) => state.ui_settings);

  const handleOptionChange = (key: string, val: string) => {
    console.log(key, val);
    dispatch(uiActions.setEnduseTableOptions({ key, val }));
  };

  return (
    <Root>
      <OptionToggle
        title="UNITS"
        buttons={[
          { key: "kbtu_per_sf", label: "kbtu/sf/yr" },
          { key: "kbtu_absolute", label: "kbtu/yr" },
        ]}
        callback={(d) => handleOptionChange("units", d)}
        current_key={units}
      />

      <OptionToggle
        title="GROUPING"
        buttons={[
          { key: "enduse", label: "enduse" },
          { key: "subcategory_combined", label: "subcategories" },
        ]}
        callback={(d) => handleOptionChange("groupby", d)}
        current_key={groupby}
      />
    </Root>
  );
};
export default EnduseTableControls;

// export type EnduseKeyTypes = "enduses_per_sf" | "enduses_absolute_kbtu";
// export type EnduseUnitTypes = "kbtu_per_sf" | "kbtu_absolute";
// export type EnduseGroupbyTypes = "enduse" | "subcategory_combined";
