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
import { AreaRowMap } from "./inputcomponents/arearowmap";

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
  let { global_inputs, design_areas } = case_inputs;

  let case_ids = [...new Set(global_inputs.map((d) => d.case_id))];
  let area_ids = [...new Set(design_areas.map((d) => d.area_id))];

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
            {/*---------- ADD / REMOVE CASES ----------*/}

            <TableRow>
              <TableCell variant="head"></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              {global_inputs.map((e: types.InputCaseTypes, i: number) => {
                return (
                  <TableCell key={i}>
                    {global_inputs.length === 1 ? (
                      <span></span>
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

            {/*---------- GLOBAL TABLE INPUTS ----------*/}
            <TableRow>
              <TableCell variant="head" rowSpan={5} sx={styles.sxRotate}>
                GLOBAL
              </TableCell>
              <TableCell></TableCell>
              <TableCell variant="head">CASE NAME</TableCell>
              {global_inputs.map((e: types.InputCaseTypes, i: number) => (
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
              <TableCell>
                <AttributeLinkButton
                  callback={() => handleAttributeLinkClick("location_state")}
                  is_linked={linked_attributes.location_state}
                />
              </TableCell>

              <TableCell variant="head">STATE</TableCell>
              {global_inputs.map((e: types.InputCaseTypes, i: number) => (
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
                    optionvalues={location_states}
                  />
                </TableCell>
              ))}
            </TableRow>

            <TableRow>
              <TableCell>
                <AttributeLinkButton
                  callback={() => handleAttributeLinkClick("climate_zone")}
                  is_linked={linked_attributes.climate_zone}
                />
              </TableCell>
              <TableCell variant="head">CLIMATE ZONE</TableCell>
              {global_inputs.map((e: types.InputCaseTypes, i: number) => (
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
              {global_inputs.map((e: types.InputCaseTypes, i: number) => (
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
              {global_inputs.map((e: types.InputCaseTypes, i: number) => (
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

            {/*---------- AREA MAP ----------*/}

            {area_ids.map((area_id, i) => {
              return (
                <React.Fragment key={i}>
                  {/* --AREA BUILDING TYPE--*/}

                  <AreaRowMap
                    area_id={area_id}
                    title="Building Type"
                    area_key="building_type"
                    component={SingleSelect as React.FunctionComponent}
                    child_props={{
                      optionvalues: building_types,
                    }}
                  />
                  {/* 
                  <TableRow>
                    <TableCell />
                    <TableCell>
                      <AttributeLinkButton
                        callback={() =>
                          handleAttributeLinkClick("building_type")
                        }
                        is_linked={linked_attributes.building_type}
                      />
                    </TableCell>
                    <TableCell variant="head">Building Type</TableCell>
                    {case_ids.map((case_id, i) => {
                      let area_obj = design_areas.find(
                        (d) => d.case_id === case_id && d.area_id === area_id
                      );

                      return (
                        <TableCell key={i}>{area_obj?.building_type}</TableCell>
                      );
                    })}
                  </TableRow> */}

                  {/* --AREA BUILDING AREA--*/}
                  <TableRow>
                    <TableCell />
                    <TableCell>
                      <AttributeLinkButton
                        callback={() =>
                          handleAttributeLinkClick("building_area")
                        }
                        is_linked={linked_attributes.building_area}
                      />
                    </TableCell>
                    <TableCell variant="head">Building Area</TableCell>
                    {case_ids.map((case_id, i) => {
                      let area_obj = design_areas.find(
                        (d) => d.case_id === case_id && d.area_id === area_id
                      );
                      return <TableCell key={i}>{area_obj?.area}</TableCell>;
                    })}
                  </TableRow>
                </React.Fragment>
              );
            })}

            {/*---------- TABLE FOOTER ----------*/}
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>

              <TableCell colSpan={global_inputs.length + 1}>
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
