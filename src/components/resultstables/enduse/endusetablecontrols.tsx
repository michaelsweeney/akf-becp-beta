import styled from "@mui/styled-engine";
import { useAppSelector, useAppDispatch } from "store/hooks";

import OptionToggle from "components/optiontoggle";
import { viewActions } from "store/viewoptionslice";
const Root = styled("div")({
  borderBottom: "1px solid black",
  marginBottom: "5px",
});
const EnduseTableControls = () => {
  const dispatch = useAppDispatch();
  const {
    enduse_table_options: { groupby, units },
  } = useAppSelector((state) => state.view_options.table_options);

  const handleOptionChange = (key: string, val: string) => {
    console.log(key, val);
    dispatch(viewActions.setEnduseTableOptions({ key, val }));
  };

  return (
    <Root>
      <OptionToggle
        title="units"
        buttons={[
          { key: "kbtu_per_sf", label: "kbtu/sf/yr" },
          { key: "kbtu_absolute", label: "kbtu/yr" },
        ]}
        callback={(d) => handleOptionChange("units", d)}
        current_key={units}
      />

      <OptionToggle
        title="grouping"
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
