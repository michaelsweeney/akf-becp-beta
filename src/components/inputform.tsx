import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/styles";

import { SingleSelect } from "./inputcomponents/singleselect";
import { FocusInput } from "./inputcomponents/focusinput";

import {
  setCaseAreaInputParameter,
  setCaseInputParameter,
} from "store/caseinputslice";
import { useAppSelector, useAppDispatch } from "store/hooks";
import * as types from "types";

import * as lookups from "../lookups";

const {
  states,
  climate_zones,
  coefficient_cases,
  ashrae_standards,
  building_types,
  heating_fuels,
  hvac_templates,
} = lookups;

const useStyles = makeStyles({
  root: {},
  tableContainer: {
    width: 1200,
    padding: 50,
    "& .MuiTableCell-head": {
      fontWeight: 700,
    },
    tableSpacer: {
      borderBottom: "solid 2px black",
    },
  },
});

const InputForm = () => {
  let case_inputs = useAppSelector((state) => state.case_inputs);
  let dispatch = useAppDispatch();

  const styles = {
    sxRotate: { transform: "rotate(-90deg)" },
  };

  const classes = useStyles();

  const handleSetCaseInputParameter = (
    payload: types.CaseInputParametersPayload
  ) => {
    dispatch(setCaseInputParameter(payload));
  };

  const handleSetCaseAreaInputParameter = (
    payload: types.CaseAreaInputParametersPayload
  ) => {
    dispatch(setCaseAreaInputParameter(payload));
  };

  return (
    <div className={classes.root}>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell variant="head" rowSpan={6} sx={styles.sxRotate}>
                GLOBAL
              </TableCell>
              <TableCell variant="head"></TableCell>
              {case_inputs.map((e: types.InputCaseTypes, i: number) => {
                return (
                  <TableCell key={i}>
                    {i === 0 ? (
                      ""
                    ) : (
                      <Button variant="outlined" size="small" color="secondary">
                        remove case
                      </Button>
                    )}
                  </TableCell>
                );
              })}
              <TableCell>
                <Button variant="contained" size="small">
                  Add Case
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">CASE NAME</TableCell>
              {case_inputs.map((e: types.InputCaseTypes, i: number) => (
                <TableCell key={i}>
                  <FocusInput
                    inputType="string"
                    callback={(c) =>
                      handleSetCaseInputParameter({
                        case_id: e.case_id,
                        value: c,
                        key: "case_name",
                      })
                    }
                    value={e.case_name}
                  />
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell variant="head">STATE</TableCell>
              {case_inputs.map((e: types.InputCaseTypes, i: number) => (
                <TableCell key={i}>
                  <SingleSelect
                    value={e.location_state}
                    callback={(c) =>
                      handleSetCaseInputParameter({
                        case_id: e.case_id,
                        value: c.target.value,
                        key: "location_state",
                      })
                    }
                    optionvalues={states}
                  />
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell variant="head">CLIMATE ZONE</TableCell>
              {case_inputs.map((e: types.InputCaseTypes, i: number) => (
                <TableCell key={i}>
                  <SingleSelect
                    value={e.climate_zone}
                    callback={(c) =>
                      handleSetCaseInputParameter({
                        case_id: e.case_id,
                        value: c.target.value,
                        key: "climate_zone",
                      })
                    }
                    optionvalues={climate_zones}
                  />
                </TableCell>
              ))}
            </TableRow>

            <TableRow>
              <TableCell variant="head">PROJECTION CASE</TableCell>
              {case_inputs.map((e: types.InputCaseTypes, i: number) => (
                <TableCell key={i}>
                  <SingleSelect
                    value={e.projection_case}
                    callback={(c) =>
                      handleSetCaseInputParameter({
                        case_id: e.case_id,
                        value: c.target.value,
                        key: "projection_case",
                      })
                    }
                    optionvalues={coefficient_cases}
                  />
                </TableCell>
              ))}
            </TableRow>

            <TableRow>
              <TableCell variant="head">HVAC Template</TableCell>
              {case_inputs.map((e: types.InputCaseTypes, i: number) => (
                <TableCell key={i}>
                  <SingleSelect
                    value={e.hvac_template}
                    callback={(c) =>
                      handleSetCaseInputParameter({
                        case_id: e.case_id,
                        value: c.target.value,
                        key: "hvac_template",
                      })
                    }
                    optionvalues={hvac_templates.map(
                      (d: types.HvacTemplate) => d.tag
                    )}
                    optiontitles={hvac_templates.map(
                      (d: types.HvacTemplate) => d.case_name
                    )}
                  />
                </TableCell>
              ))}
            </TableRow>

            {case_inputs[0].design_areas
              .map((d: types.InputAreaTypes) => d.area_id)
              .map((id: number) => {
                let area_case = case_inputs.map(
                  (d: types.InputCaseTypes) =>
                    d.design_areas.filter(
                      (e: types.InputAreaTypes) => e.area_id === id
                    )[0]
                );
                let case_ids = case_inputs.map(
                  (d: types.InputCaseTypes) => d.case_id
                );

                return (
                  <React.Fragment key={id}>
                    <TableRow>
                      <TableCell
                        variant="head"
                        rowSpan={7}
                        sx={styles.sxRotate}
                      >
                        <Button size="small" color="secondary">
                          x
                        </Button>
                        AREA TYPE {id + 1}{" "}
                      </TableCell>
                      <TableCell variant="head">Building Type</TableCell>
                      {area_case.map((d: types.InputAreaTypes, i: number) => (
                        <TableCell key={i}>
                          <SingleSelect
                            value={d.building_type}
                            callback={(c) =>
                              handleSetCaseAreaInputParameter({
                                case_id: case_ids[i],
                                area_id: d.area_id,
                                value: c.target.value,
                                key: "building_type",
                              })
                            }
                            optionvalues={building_types}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">Area</TableCell>

                      {area_case.map((d: types.InputAreaTypes, i: number) => (
                        <TableCell key={i}>
                          <FocusInput
                            inputType="number"
                            callback={(c) =>
                              handleSetCaseAreaInputParameter({
                                case_id: case_ids[i],
                                area_id: d.area_id,
                                value: c,
                                key: "area",
                              })
                            }
                            value={d.area}
                          />
                        </TableCell>
                      ))}
                    </TableRow>

                    <TableRow>
                      <TableCell variant="head">ASHRAE Standard</TableCell>

                      {area_case.map((d: types.InputAreaTypes, i: number) => (
                        <TableCell key={i}>
                          <SingleSelect
                            value={d.ashrae_standard}
                            callback={(c) =>
                              handleSetCaseAreaInputParameter({
                                case_id: case_ids[i],
                                area_id: d.area_id,
                                value: c.target.value,
                                key: "ashrae_standard",
                              })
                            }
                            optionvalues={ashrae_standards}
                          />
                        </TableCell>
                      ))}
                    </TableRow>

                    <TableRow>
                      <TableCell variant="head">Heating Fuel</TableCell>

                      {area_case.map((d: types.InputAreaTypes, i: number) => (
                        <TableCell key={i}>
                          <SingleSelect
                            value={d.heating_fuel}
                            callback={(c) =>
                              handleSetCaseAreaInputParameter({
                                case_id: case_ids[i],
                                area_id: d.area_id,
                                value: c.target.value,
                                key: "heating_fuel",
                              })
                            }
                            optionvalues={heating_fuels}
                          />
                        </TableCell>
                      ))}
                    </TableRow>

                    <TableRow>
                      <TableCell variant="head">Heating COP</TableCell>

                      {area_case.map((d: types.InputAreaTypes, i: number) => (
                        <TableCell key={i}>
                          <FocusInput
                            inputType="number"
                            callback={(c) =>
                              handleSetCaseAreaInputParameter({
                                case_id: case_ids[i],
                                area_id: d.area_id,
                                value: c,
                                key: "heating_cop",
                              })
                            }
                            value={d.heating_cop}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">DHW Fuel</TableCell>

                      {area_case.map((d: types.InputAreaTypes, i: number) => (
                        <TableCell key={i}>
                          <SingleSelect
                            value={d.dhw_fuel}
                            callback={(c) =>
                              handleSetCaseAreaInputParameter({
                                case_id: case_ids[i],
                                area_id: d.area_id,
                                value: c.target.value,
                                key: "dhw_fuel",
                              })
                            }
                            optionvalues={heating_fuels}
                          />
                        </TableCell>
                      ))}
                    </TableRow>

                    <TableRow>
                      <TableCell variant="head">DHW COP</TableCell>

                      {area_case.map((d: types.InputAreaTypes, i: number) => (
                        <TableCell key={i}>
                          <FocusInput
                            inputType="number"
                            callback={(c) =>
                              handleSetCaseAreaInputParameter({
                                case_id: case_ids[i],
                                area_id: d.area_id,
                                value: c,
                                key: "dhw_cop",
                              })
                            }
                            value={d.dhw_cop}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  </React.Fragment>
                );
              })}

            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>

              <TableCell colSpan={case_inputs.length}>
                <Button variant="contained" size="small">
                  Add Area Type
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default InputForm;
