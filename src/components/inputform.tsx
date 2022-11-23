import React from "react";

import { styled } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import { Button } from "@mui/material";

import { SingleSelect } from "./inputcomponents/singleselect";
import { FocusInput } from "./inputcomponents/focusinput";

import { caseInputActions } from "store/caseinputslice";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { InputCaseTypes, HvacTemplateTypes } from "types";

import * as lookups from "../lookups";
import AreaRowMap from "./inputcomponents/arearowmap";
import GlobalRowMap from "./inputcomponents/globalrowmap";
import CaseAttributeRowMap from "./inputcomponents/caseattributerowmap";
import { TD, TDRotate, StyledButton } from "components/styles/components";

const {
  location_states,
  climate_zones,
  coefficient_cases,
  ashrae_standards,
  building_types,
  heating_fuels,
  hvac_templates,
} = lookups;

const InputContainer = styled("div")<{}>(() => ({
  marginLeft: "15px",
  marginRight: "10px",
}));

const InputForm = () => {
  let { case_inputs } = useAppSelector((state) => state);
  let { api_inputs } = case_inputs;

  let case_ids = [...new Set(api_inputs.global.map((d) => d.case_id))];
  let area_ids = [...new Set(api_inputs.areas.map((d) => d.area_id))];

  const dispatch = useAppDispatch();

  const handleAddCase = () => {
    dispatch(caseInputActions.addCase());
  };

  const handleRemoveCase = (case_id: number) => {
    dispatch(caseInputActions.removeCase({ case_id }));
  };

  const handleAddAreaType = () => {
    dispatch(caseInputActions.addAreaType());
  };

  const handleRemoveAreaType = (area_id: number) => {
    dispatch(caseInputActions.removeAreaType({ area_id }));
  };

  return (
    <InputContainer>
      <StyledButton
        onClick={() => handleAddCase()}
        variant="outlined"
        size="small"
      >
        Add Case
      </StyledButton>

      <StyledButton
        onClick={() => handleAddAreaType()}
        variant="outlined"
        size="small"
      >
        Add Area Type
      </StyledButton>

      <TableContainer>
        <Table size="small">
          <TableBody>
            {/*---------- ADD / REMOVE CASES ----------*/}
            <TableRow>
              <TD variant="head"></TD>
              <TD></TD>
              <TD></TD>
              {case_ids.map((case_id) => {
                let global_obj = api_inputs.global.find(
                  (d) => d.case_id === case_id
                ) as InputCaseTypes;
                return (
                  <TD key={case_id}>
                    {api_inputs.global.length === 1 ? (
                      <span></span>
                    ) : (
                      <Button
                        variant="text"
                        size="small"
                        color="secondary"
                        onClick={() => handleRemoveCase(global_obj.case_id)}
                      >
                        remove case
                      </Button>
                    )}
                  </TD>
                );
              })}
            </TableRow>

            <TableRow>
              <TDRotate variant="head" rowSpan={5}>
                GLOBAL
              </TDRotate>
              {/*---------- CASE ATTRIBUTE  MAPPING ----------*/}
              <CaseAttributeRowMap
                title="Case Name"
                global_key="case_name"
                component={FocusInput as React.FunctionComponent}
                child_props={{
                  input_type: "string",
                }}
              />
            </TableRow>
            <TableRow>
              <CaseAttributeRowMap
                title="HVAC Template"
                global_key="hvac_template"
                component={SingleSelect as React.FunctionComponent}
                child_props={{
                  option_values: hvac_templates.map(
                    (d: HvacTemplateTypes) => d.tag
                  ),
                  option_titles: hvac_templates.map(
                    (d: HvacTemplateTypes) => d.case_name
                  ),
                }}
              />
            </TableRow>
            {/*---------- GLOBAL INPUT  MAPPING ----------*/}

            <TableRow>
              <GlobalRowMap
                title="State"
                global_key="location_state"
                component={SingleSelect as React.FunctionComponent}
                child_props={{
                  option_values: location_states,
                }}
              />
            </TableRow>

            <TableRow>
              <GlobalRowMap
                title="Climate Zone"
                global_key="climate_zone"
                component={SingleSelect as React.FunctionComponent}
                child_props={{
                  option_values: climate_zones,
                }}
              />
            </TableRow>

            <TableRow>
              <GlobalRowMap
                title="Projection Case"
                global_key="projection_case"
                component={SingleSelect as React.FunctionComponent}
                child_props={{
                  option_values: coefficient_cases,
                }}
              />
            </TableRow>

            {/*---------- AREA INPUT MAPPING ----------*/}

            {area_ids.map((area_id, i) => {
              return (
                <React.Fragment key={i}>
                  <TableRow>
                    <TDRotate variant="head" rowSpan={7}>
                      <div>{`AREA TYPE ${i + 1}`}</div>
                      <div>
                        {area_ids.length === 1 ? (
                          <span></span>
                        ) : (
                          <Button
                            sx={{ width: "100px !important" }}
                            onClick={() => handleRemoveAreaType(area_id)}
                            variant="text"
                            size="small"
                            color="secondary"
                          >
                            remove
                          </Button>
                        )}
                      </div>
                    </TDRotate>

                    <AreaRowMap
                      area_id={area_id}
                      title="Building Type"
                      area_key="building_type"
                      component={SingleSelect as React.FunctionComponent}
                      child_props={{
                        option_values: building_types,
                      }}
                    />
                  </TableRow>

                  <TableRow>
                    <AreaRowMap
                      area_id={area_id}
                      title="ASHRAE Standard"
                      area_key="ashrae_standard"
                      component={SingleSelect as React.FunctionComponent}
                      child_props={{
                        option_values: ashrae_standards,
                      }}
                    />
                  </TableRow>

                  <TableRow>
                    <AreaRowMap
                      area_id={area_id}
                      title="Area"
                      area_key="building_area"
                      component={FocusInput as React.FunctionComponent}
                      child_props={{
                        input_type: "number",
                      }}
                    />
                  </TableRow>
                  <TableRow>
                    <AreaRowMap
                      area_id={area_id}
                      title="Heating Fuel"
                      area_key="heating_fuel"
                      component={SingleSelect as React.FunctionComponent}
                      child_props={{
                        option_values: heating_fuels,
                      }}
                    />
                  </TableRow>
                  <TableRow>
                    <AreaRowMap
                      area_id={area_id}
                      title="Heating COP"
                      area_key="heating_cop"
                      component={FocusInput as React.FunctionComponent}
                      child_props={{
                        input_type: "number",
                      }}
                    />
                  </TableRow>

                  <TableRow>
                    <AreaRowMap
                      area_id={area_id}
                      title="DHW Fuel"
                      area_key="dhw_fuel"
                      component={SingleSelect as React.FunctionComponent}
                      child_props={{
                        option_values: heating_fuels,
                      }}
                    />
                  </TableRow>

                  <TableRow>
                    <AreaRowMap
                      area_id={area_id}
                      title="DHW COP"
                      area_key="dhw_cop"
                      component={FocusInput as React.FunctionComponent}
                      child_props={{
                        input_type: "number",
                      }}
                    />
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </InputContainer>
  );
};

export default InputForm;
