import React, { FunctionComponent } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import { Button } from "@mui/material";

import { SingleSelect } from "./inputcomponents/singleselect";
import { FocusInput } from "./inputcomponents/focusinput";

import { AttributeLinkButton } from "./inputcomponents/attributelinkbutton";
import { AttributeRowMap } from "./inputcomponents/attributerowmap";
import {
  setCaseAreaInputParameter,
  setCaseInputParameter,
  addCase,
  removeCase,
  addAreaType,
  removeAreaType,
} from "store/caseinputslice";

import { setLinkedAttribute } from "store/uislice";
import { useAppSelector, useAppDispatch } from "store/hooks";
import * as types from "types";

import * as lookups from "../lookups";

const {
  location_states,
  climate_zones,
  coefficient_cases,
  ashrae_standards,
  building_types,
  heating_fuels,
  hvac_templates,
} = lookups;

const InputForm = () => {
  let { case_inputs, ui_settings } = useAppSelector((state) => state);
  let { linked_attributes } = ui_settings;

  const dispatch = useAppDispatch();

  const styles = {
    sxRotate: { transform: "rotate(-90deg)", textAlign: "center" },
  };

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

  const handleAddCase = () => {
    dispatch(addCase());
  };

  const handleRemoveCase = (case_id: number) => {
    dispatch(removeCase({ case_id }));
  };

  const handleAddAreaType = () => {
    dispatch(addAreaType());
  };

  const handleRemoveAreaType = (area_id: number) => {
    dispatch(removeAreaType({ area_id }));
  };

  const handleAttributeLinkClick = (e: string) => {
    let key = e as keyof typeof linked_attributes;
    let current_attribute_val = linked_attributes[key];

    //todo : handle logic here, via separate dispatch, to overwrite values if changing from unlinked to linked.

    dispatch(
      setLinkedAttribute({
        key: e,
        bool: !current_attribute_val,
      })
    );
  };

  return (
    <div style={{ margin: 30 }}>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell variant="head"></TableCell> <TableCell></TableCell>
              <TableCell></TableCell>
              {case_inputs.map((e: types.InputCaseTypes, i: number) => {
                return (
                  <TableCell key={i}>
                    {case_inputs.length === 1 ? (
                      ""
                    ) : (
                      <Button
                        variant="text"
                        size="small"
                        color="secondary"
                        onClick={() => handleRemoveCase(e.case_id)}
                      >
                        delete case
                      </Button>
                    )}
                  </TableCell>
                );
              })}
              <TableCell>
                <Button
                  onClick={() => handleAddCase()}
                  variant="contained"
                  size="small"
                >
                  Add Case
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head" rowSpan={5} sx={styles.sxRotate}>
                GLOBAL
              </TableCell>
              <TableCell></TableCell>
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
              <AttributeRowMap
                input_key="location_state"
                title="STATE"
                child_component={SingleSelect as FunctionComponent}
                child_props={{
                  optionvalues: lookups.location_states,
                }}
              />
              {/* <TableCell>
                <AttributeLinkButton
                  callback={() => handleAttributeLinkClick("location_state")}
                  is_linked={linked_attributes.location_state}
                />
              </TableCell> */}

              {/* <TableCell variant="head">STATE</TableCell>
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
              ))} */}
            </TableRow>

            <TableRow>
              <TableCell>
                <AttributeLinkButton
                  callback={() => handleAttributeLinkClick("climate_zone")}
                  is_linked={linked_attributes.climate_zone}
                />
              </TableCell>
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
              <TableCell>
                <AttributeLinkButton
                  callback={() => handleAttributeLinkClick("projection_case")}
                  is_linked={linked_attributes.projection_case}
                />
              </TableCell>
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
              <TableCell>
                <AttributeLinkButton
                  callback={() => handleAttributeLinkClick("hvac_template")}
                  is_linked={linked_attributes.hvac_template}
                />
              </TableCell>
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
              .map((area_id: number, i) => {
                let area_case = case_inputs.map(
                  (d: types.InputCaseTypes) =>
                    d.design_areas.filter(
                      (e: types.InputAreaTypes) => e.area_id === area_id
                    )[0]
                );
                let case_ids = case_inputs.map(
                  (d: types.InputCaseTypes) => d.case_id
                );

                return (
                  <React.Fragment key={area_id}>
                    <TableRow>
                      <TableCell
                        variant="head"
                        rowSpan={7}
                        sx={styles.sxRotate}
                      >
                        <div>AREA TYPE {i + 1}</div>
                        <div>
                          {case_inputs[0].design_areas.length === 1 ? (
                            ""
                          ) : (
                            <Button
                              size="small"
                              color="secondary"
                              onClick={() => handleRemoveAreaType(area_id)}
                            >
                              remove area type
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <AttributeLinkButton
                          callback={() =>
                            handleAttributeLinkClick("building_type")
                          }
                          is_linked={linked_attributes.building_type}
                        />
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
                      <TableCell>
                        <AttributeLinkButton
                          callback={() =>
                            handleAttributeLinkClick("building_area")
                          }
                          is_linked={linked_attributes.building_area}
                        />
                      </TableCell>

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
                      <TableCell>
                        <AttributeLinkButton
                          is_linked={linked_attributes.ashrae_standard}
                          callback={() =>
                            handleAttributeLinkClick("ashrae_standard")
                          }
                        />
                      </TableCell>

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
                      <TableCell>
                        <AttributeLinkButton
                          is_linked={linked_attributes.heating_fuel}
                          callback={() =>
                            handleAttributeLinkClick("heating_fuel")
                          }
                        />
                      </TableCell>

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
                      <TableCell>
                        <AttributeLinkButton
                          is_linked={linked_attributes.heating_cop}
                          callback={() =>
                            handleAttributeLinkClick("heating_cop")
                          }
                        />
                      </TableCell>
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
                      <TableCell>
                        <AttributeLinkButton
                          is_linked={linked_attributes.dhw_fuel}
                          callback={() => handleAttributeLinkClick("dhw_fuel")}
                        />
                      </TableCell>
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
                      <TableCell>
                        <AttributeLinkButton
                          is_linked={linked_attributes.dhw_cop}
                          callback={() => handleAttributeLinkClick("dhw_cop")}
                        />
                      </TableCell>

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

              <TableCell colSpan={case_inputs.length + 1}>
                <Button
                  onClick={() => handleAddAreaType()}
                  variant="contained"
                  size="small"
                >
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
