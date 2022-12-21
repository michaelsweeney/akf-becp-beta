import OptionToggle from "components/optiontoggle";
import styled from "@mui/styled-engine";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { viewActions } from "store/viewoptionslice";
import { SingleSelect } from "components/singleselect";
import OptionContainer from "components/optioncontainer";

const SelectWrapper = styled("div")({
  display: "inline-block",
  position: "relative",
  top: 2,
  left: 5,
  paddingRight: 15,
});

const StackedControls = () => {
  const dispatch = useAppDispatch();

  const handleOptionChange = (key: string, val: string) => {
    dispatch(viewActions.setStackedPlotOptions({ key, val }));
  };

  const handleSelectChange = (d: string | number) => {
    dispatch(
      viewActions.setStackedPlotOptions({ key: "current_case_id", val: +d })
    );
  };

  const { units, current_case_id, grouping } = useAppSelector(
    (state) => state.view_options.plot_options.stacked_plot_options
  );

  const { case_attributes } = useAppSelector((state) => state.case_inputs);

  const case_names = case_attributes.map((d) => d.case_name);
  const case_ids = case_attributes.map((d) => d.case_id.toString());

  return (
    <>
      <OptionContainer
        title="view case"
        children={
          <SelectWrapper>
            <SingleSelect
              option_values={case_ids}
              value={current_case_id.toString()}
              option_titles={case_names}
              callback={handleSelectChange}
            />
          </SelectWrapper>
        }
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
      <OptionToggle
        title="grouping"
        buttons={[
          { key: "category", label: "category" },
          { key: "fuel", label: "fuel" },
        ]}
        callback={(d) => {
          handleOptionChange("grouping", d);
        }}
        current_key={grouping}
      />
    </>
  );
};

export default StackedControls;
