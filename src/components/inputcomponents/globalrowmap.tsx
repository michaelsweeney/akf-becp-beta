import React from "react";

import { CaseInputParametersPayloadTypes } from "types";
import { AttributeLinkButton } from "./attributelinkbutton";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { caseInputActions } from "store/caseinputslice";

import { uiActions } from "store/uislice";
import { TD } from "styles/components";

type OptionalChildPropTypes = {
  option_values?: string[];
  option_titles?: string[];
  input_type?: string;
  is_disabled?: boolean;
};

type PropTypes = {
  title: string;
  global_key: string;
  child_props: OptionalChildPropTypes;
  component: React.FunctionComponent<OptionalChildPropTypes>;
};

const GlobalRowMap = (props: PropTypes) => {
  const { title, global_key, child_props, component } = props;
  const ChildComponent = component;

  const dispatch = useAppDispatch();
  let { case_inputs, ui_settings } = useAppSelector((state) => state);
  let { linked_attributes } = ui_settings;
  let { api_inputs } = case_inputs;
  let case_ids = [...new Set(api_inputs.global.map((d) => d.case_id))];

  const handleSetCaseInputParameter = (
    payload: CaseInputParametersPayloadTypes
  ) => {
    let is_linked =
      linked_attributes[payload.key as keyof typeof linked_attributes];

    if (is_linked) {
      // hard-set all cases
      case_ids.forEach((id) => {
        let proxy_payload: CaseInputParametersPayloadTypes = {
          case_id: id,
          key: payload.key,
          value: payload.value,
        };
        dispatch(caseInputActions.setCaseGlobalParameter(proxy_payload));
      });
    } else {
      // set only the specified case
      dispatch(caseInputActions.setCaseGlobalParameter(payload));
    }
  };

  const handleToggleAttributeLink = (e: string) => {
    let key = e as keyof typeof linked_attributes;
    let current_attribute_val = linked_attributes[key];

    if (!current_attribute_val) {
      // copy first column over to all others.
      let first_case_obj = api_inputs.global[0];
      case_ids.forEach((id) => {
        let proxy_payload: CaseInputParametersPayloadTypes = {
          key: e,
          value: first_case_obj[e as keyof typeof first_case_obj],
          case_id: id,
        };
        dispatch(caseInputActions.setCaseGlobalParameter(proxy_payload));
      });

      dispatch(
        uiActions.setLinkedAttribute({
          key: e,
          bool: !current_attribute_val,
        })
      );
    } else {
      dispatch(
        uiActions.setLinkedAttribute({
          key: e,
          bool: !current_attribute_val,
        })
      );
    }
  };

  return (
    <React.Fragment>
      <TD>
        {global_key === "case_name" ? (
          <span></span>
        ) : (
          <AttributeLinkButton
            callback={() => handleToggleAttributeLink(global_key)}
            is_linked={
              linked_attributes[global_key as keyof typeof linked_attributes]
            }
          />
        )}
      </TD>
      <TD variant="head">{title}</TD>

      {case_ids.map((case_id, i) => {
        let area_obj = api_inputs.global.find((d) => d.case_id === case_id);

        let is_row_linked =
          linked_attributes[global_key as keyof typeof linked_attributes];
        let is_disabled: boolean = false;
        if (i !== 0) {
          is_disabled = is_row_linked;
        }

        let props_to_add = {
          ...child_props,
          value: area_obj
            ? area_obj[global_key as keyof typeof area_obj]
            : undefined,
          callback: (c: string | number) =>
            handleSetCaseInputParameter({
              case_id: case_id,
              value: c,
              key: global_key,
            }),
          is_disabled: is_disabled,
        };

        return (
          <TD key={i}>
            <ChildComponent {...props_to_add} />
          </TD>
        );
      })}
    </React.Fragment>
  );
};

export default GlobalRowMap;
