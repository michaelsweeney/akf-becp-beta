import React from "react";

import * as types from "types";
import TableCell from "@mui/material/TableCell";
import { AttributeLinkButton } from "./attributelinkbutton";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { setCaseInputParameter } from "store/caseinputslice";

import { setLinkedAttribute } from "store/uislice";

type OptionalChildPropTypes = {
  option_values?: string[];
  option_titles?: string[];
  input_type?: string;
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
  let { global_inputs } = case_inputs;
  let case_ids = [...new Set(global_inputs.map((d) => d.case_id))];

  const handleSetCaseInputParameter = (
    payload: types.CaseInputParametersPayload
  ) => {
    dispatch(setCaseInputParameter(payload));
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
    <React.Fragment>
      <TableCell>
        <AttributeLinkButton
          callback={() => handleAttributeLinkClick(global_key)}
          is_linked={
            linked_attributes[global_key as keyof typeof linked_attributes]
          }
        />
      </TableCell>
      <TableCell variant="head">{title}</TableCell>

      {case_ids.map((case_id, i) => {
        let area_obj = global_inputs.find((d) => d.case_id === case_id);

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
        };

        return (
          <TableCell key={i}>
            <ChildComponent {...props_to_add} />
          </TableCell>
        );
      })}
    </React.Fragment>
  );
};

export { GlobalRowMap };
