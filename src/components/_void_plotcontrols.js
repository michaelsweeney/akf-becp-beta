import { conn } from "../store/connect";

import {
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

import { makeStyles } from "@material-ui/styles";
import { SingleSelect } from "./singleselect";

const useStyles = makeStyles({
  root: {},

  selectContainer: {
    margin: 15,
    width: 200,
  },
});

const PlotControls = (props) => {
  const { plot_config, cases } = props;
  const classes = useStyles();

  const handlePlotTypeSelectChange = (p) => {
    props.actions.setActivePlot(p.target.value);
  };

  const handleThresholdTypeSelector = (p) => {
    props.actions.setThresholdView(p.target.value);
  };
  const handleStackedIndexSelector = (p) => {
    props.actions.setStackedAreaIndex(p.target.value);
  };
  return (
    <div>
      <SingleSelect
        id="plot-type-selector"
        value={plot_config.activePlot}
        label="Plot Type"
        callback={handlePlotTypeSelectChange}
        optionvalues={["multiline", "stacked"]}
        optiontitles={["Multiline", "Stacked by Fuel"]}
      />

      {plot_config.activePlot == "stacked" ? (
        <SingleSelect
          id="stacked-index-selector"
          label="Stacked Index Selector"
          value={plot_config.stackedAreaIndex}
          callback={handleStackedIndexSelector}
          optionvalues={cases.case_inputs.map((e, i) => i)}
          optiontitles={cases.case_inputs.map((e, i) => e.case_name)}
        />
      ) : (
        <div></div>
      )}

      <SingleSelect
        id="threshold-type-selector"
        label="Threshold Overlay"
        callback={handleThresholdTypeSelector}
        value={plot_config.thresholdView}
        optionvalues={["none", "berdo", "ll97"]}
        optiontitles={["None", "BERDO", "LL97"]}
      />
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    cases: store.cases,
    plot_config: store.plot_config,
  };
};

export default conn(mapStateToProps)(PlotControls);
