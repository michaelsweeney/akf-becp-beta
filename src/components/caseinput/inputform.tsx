import React from "react";

import { styled } from "@mui/system";
import { Table, TableBody, TableContainer, Button } from "@mui/material";

import { SingleSelect } from "../singleselect";
import { FocusInput } from "../focusinput";

import { caseInputActions } from "store/caseinputslice";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { InputCaseTypes, HvacTemplateTypes } from "types";

import * as lookups from "lookups";
import AreaRowMap from "./arearowmap";
import GlobalRowMap from "./globalrowmap";
import CaseAttributeRowMap from "./caseattributerowmap";
import { TD, TDRotate, StyledButton, H2, TR } from "styles/components";
import { relative } from "node:path/win32";

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

const ButtonContainer = styled("div")({
  float: "right",
  // marginRight: "200px",
  marginLeft: "55px",
  marginTop: "10px",
  marginBottom: "10px",
});

const TopContainer = styled("div")({
  marginLeft: "100px",
  boxSizing: "border-box",
});

const TitleWrapper = styled(H2)({
  position: "relative",
  top: "10px",
});

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
      <TopContainer>
        <TitleWrapper>Case Inputs</TitleWrapper>

        <ButtonContainer>
          <StyledButton onClick={() => handleAddCase()} variant="contained">
            Add Case
          </StyledButton>
          <StyledButton onClick={() => handleAddAreaType()} variant="contained">
            Add Area Type
          </StyledButton>
        </ButtonContainer>
      </TopContainer>

      <TableContainer>
        <Table size="small">
          <TableBody>
            {/*---------- ADD / REMOVE CASES ----------*/}
            <TR>
              <TD variant="head"></TD>
              <TD bottomBorder></TD>
              <TD bottomBorder></TD>
              {case_ids.map((case_id) => {
                let global_obj = api_inputs.global.find(
                  (d) => d.case_id === case_id
                ) as InputCaseTypes;
                return (
                  <TD bottomBorder key={case_id}>
                    {api_inputs.global.length === 1 ? (
                      <span></span>
                    ) : (
                      <StyledButton
                        size="small"
                        color="secondary"
                        variant="outlined"
                        onClick={() => handleRemoveCase(global_obj.case_id)}
                      >
                        Remove Case
                      </StyledButton>
                    )}
                  </TD>
                );
              })}
            </TR>

            <TR>
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
                  fire_on: "change",
                }}
              />
            </TR>
            <TR>
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
            </TR>
            {/*---------- GLOBAL INPUT  MAPPING ----------*/}

            <TR>
              <GlobalRowMap
                title="State"
                global_key="location_state"
                component={SingleSelect as React.FunctionComponent}
                child_props={{
                  option_values: location_states,
                }}
              />
            </TR>

            <TR>
              <GlobalRowMap
                title="Climate Zone"
                global_key="climate_zone"
                component={SingleSelect as React.FunctionComponent}
                child_props={{
                  option_values: climate_zones,
                }}
              />
            </TR>

            <TR bottomBorder>
              <GlobalRowMap
                title="Projection Case"
                global_key="projection_case"
                component={SingleSelect as React.FunctionComponent}
                child_props={{
                  option_values: coefficient_cases,
                }}
              />
            </TR>

            {/*---------- AREA INPUT MAPPING ----------*/}

            {area_ids.map((area_id, i) => {
              return (
                <React.Fragment key={i}>
                  <TR>
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
                  </TR>

                  <TR>
                    <AreaRowMap
                      area_id={area_id}
                      title="ASHRAE Standard"
                      area_key="ashrae_standard"
                      component={SingleSelect as React.FunctionComponent}
                      child_props={{
                        option_values: ashrae_standards,
                      }}
                    />
                  </TR>

                  <TR>
                    <AreaRowMap
                      area_id={area_id}
                      title="Area"
                      area_key="building_area"
                      component={FocusInput as React.FunctionComponent}
                      child_props={{
                        input_type: "number",
                      }}
                    />
                  </TR>
                  <TR>
                    <AreaRowMap
                      area_id={area_id}
                      title="Heating Fuel"
                      area_key="heating_fuel"
                      component={SingleSelect as React.FunctionComponent}
                      child_props={{
                        option_values: heating_fuels,
                      }}
                    />
                  </TR>
                  <TR>
                    <AreaRowMap
                      area_id={area_id}
                      title="Heating COP"
                      area_key="heating_cop"
                      component={FocusInput as React.FunctionComponent}
                      child_props={{
                        input_type: "number",
                      }}
                    />
                  </TR>

                  <TR>
                    <AreaRowMap
                      area_id={area_id}
                      title="DHW Fuel"
                      area_key="dhw_fuel"
                      component={SingleSelect as React.FunctionComponent}
                      child_props={{
                        option_values: heating_fuels,
                      }}
                    />
                  </TR>

                  <TR bottomBorder>
                    <AreaRowMap
                      area_id={area_id}
                      title="DHW COP"
                      area_key="dhw_cop"
                      component={FocusInput as React.FunctionComponent}
                      child_props={{
                        input_type: "number",
                      }}
                    />
                  </TR>
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