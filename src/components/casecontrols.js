import { conn } from "../store/connect";

import {
  MenuItem,
  Select,
  FormControl,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Checkbox,
  Radio,
} from "@mui/material";

import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import * as api from "../apicalls";
import { SingleSelect } from "./singleselect";
import { FocusInput } from "./focusinput";
import { IconSvg } from "./svgicons";

const useStyles = makeStyles({
  root: {},

  selectContainer: {
    // margin: 15,
    // width: 200,
  },
  table: {
    "&&& td": {
      //   paddingTop: 5,
      padding: 5,
    },
  },
});

const templates = [
  {
    tag: "elec_ashp",
    case_name: "Air Source HP",
    heating_fuel: "Electricity",
    heating_cop: 3.2,
  },
  {
    tag: "elec_resistance",
    case_name: "Electric Resistance",
    heating_fuel: "Electricity",
    heating_cop: 1,
  },
  {
    tag: "ng_furnace",
    case_name: "NG Heating",
    heating_fuel: "Natural Gas",
    heating_cop: 0.8,
  },
  {
    tag: "vrf",
    case_name: "VRF",
    heating_fuel: "Electricity",
    heating_cop: 4.45,
  },
  {
    tag: "gshp",
    case_name: "GSHP",
    heating_fuel: "Electricity",
    heating_cop: 4.95,
  },
];

const CaseControls = (props) => {
  const classes = useStyles();
  const { case_inputs, icon_array_displayed } = props;

  const updateResults = () => {
    api.getProjectionFromReferenceBuildings(
      case_inputs,
      props.actions.setCaseResults,
      props.actions.setIsLoading
    );
  };

  useEffect(() => {
    updateResults();
  }, [case_inputs]);

  const handleChangeHeatingAndDomesticCOP = (idx, cop) => {
    props.actions.setCaseHeatingAndDomesticCOP({
      idx,
      cop,
    });
    // updateResults();
  };

  const handleChangeHeatingAndDomesticFuelSource = (idx, source) => {
    props.actions.setCaseHeatingAndDomesticFuelSource({ idx, source });
    // updateResults();
  };

  const handleChangeName = (idx, case_name) => {
    props.actions.setCaseName({ idx: idx, case_name: case_name });
    // updateResults();
  };
  const handleChangeBaseCase = (idx) => {
    props.actions.setBaseCase({ idx: idx });
    // updateResults();
  };
  const handleChangeHeatingTemplate = (idx, template) => {
    let template_values = templates.find((d) => d.tag === template);

    let { case_name, heating_fuel, heating_cop } = template_values;
    props.actions.setCaseHeatingTemplate({ idx, template });
    props.actions.setCaseName({ idx, case_name });
    props.actions.setCaseHeatingAndDomesticFuelSource({
      idx: idx,
      source: heating_fuel,
    });
    props.actions.setCaseHeatingAndDomesticCOP({
      idx: idx,
      cop: heating_cop,
    });

    // updateResults();
  };

  const handleChangeIsDisplayed = (idx, bool) => {
    props.actions.setCaseIsDisplayed({ idx, bool });
    // updateResults();
  };

  let icon_array_all = [];
  case_inputs.forEach((e) => {
    let icon_obj = icon_array_displayed.find((d) => e.case_name == d.case_name);
    if (icon_obj) {
      icon_array_all.push(icon_obj);
    } else {
      icon_array_all.push({
        case_name: e.case_name,
        case_color: "white",
        case_icon_d: "",
      });
    }
  });

  return (
    <div>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Legend Icon</TableCell>
            <TableCell>Base Case</TableCell>
            <TableCell>Display Case</TableCell>
            <TableCell>Case Name</TableCell>
            <TableCell>Template</TableCell>
            <TableCell>Heating Fuel</TableCell>
            <TableCell>Annual Heating COP</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {case_inputs.map((c, i) => {
            return (
              <TableRow key={`tablerow-${i}`}>
                <TableCell sx={{ textAlign: "center" }}>
                  <IconSvg
                    d={icon_array_all[i].case_icon_d}
                    fill={icon_array_all[i].case_color}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Radio
                    onChange={() => handleChangeBaseCase(i)}
                    checked={c.is_base_case}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <FormControl size="small">
                    <Checkbox
                      onChange={() =>
                        handleChangeIsDisplayed(i, !c.is_displayed)
                      }
                      checked={c.is_displayed}
                    />
                  </FormControl>
                </TableCell>

                <TableCell>
                  <FormControl size="small" fullWidth>
                    <FocusInput
                      callback={(e) => handleChangeName(i, e)}
                      value={c.case_name}
                      inputType="text"
                    />
                  </FormControl>
                </TableCell>

                <TableCell>
                  <FormControl size="small" fullWidth>
                    <Select
                      onChange={(e) => {
                        handleChangeHeatingTemplate(i, e.target.value);
                      }}
                      value={c.starting_template}
                      //   label="template"
                    >
                      {templates.map((e, i) => {
                        return (
                          <MenuItem key={`template-${i}`} value={e.tag}>
                            {e.case_name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </TableCell>

                <TableCell>
                  <FormControl size="small" fullWidth>
                    <Select
                      onChange={(e) =>
                        handleChangeHeatingAndDomesticFuelSource(
                          i,
                          e.target.value
                        )
                      }
                      value={c.design_areas[0].heating_fuel}
                    >
                      <MenuItem value="Electricity">Electricity</MenuItem>
                      <MenuItem value="Natural Gas">Natural Gas</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl size="small" fullWidth>
                    <FocusInput
                      callback={(e) => handleChangeHeatingAndDomesticCOP(i, e)}
                      value={c.design_areas[0].heating_cop}
                      inputType="number"
                    />
                  </FormControl>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    case_inputs: store.case_inputs.case_inputs,
    icon_array_displayed: store.case_outputs.icon_array_displayed,
  };
};

export default conn(mapStateToProps)(CaseControls);
