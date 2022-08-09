import React, { FunctionComponent } from "react";

import { TableCell } from "@mui/material";
import { AttributeLinkButton } from "./attributelinkbutton";
import { SingleSelect } from "./singleselect";
import * as types from "types";

import { useAppSelector, useAppDispatch } from "store/hooks";

import { setCaseInputParameter } from "store/caseinputslice";

import { setLinkedAttribute } from "store/uislice";

import * as lookups from "lookups";

type PropTypes = {
  input_key: string;
  title: string;
  child_component: FunctionComponent;
  child_props: {};
};

const AttributeRowMap = (props: PropTypes) => {
  const dispatch = useAppDispatch();

  let { case_inputs, ui_settings } = useAppSelector((state) => state);
  let { linked_attributes } = ui_settings;
  const { input_key, child_component, title, child_props } = props;

  let ChildComponent = child_component as FunctionComponent;

  let typed_input_key = input_key as keyof typeof linked_attributes;

  let key2 = "location_states";
  let select_option_values = lookups[key2 as keyof typeof lookups];

  const handleSetCaseInputParameter = (
    payload: types.CaseInputParametersPayload
  ) => {
    dispatch(setCaseInputParameter(payload));
  };

  const handleAttributeLinkClick = (e: string) => {
    let current_attribute_val = linked_attributes[typed_input_key];

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
          callback={() => handleAttributeLinkClick(typed_input_key)}
          is_linked={linked_attributes[typed_input_key]}
        />
      </TableCell>
      <TableCell variant="head">{title}</TableCell>
      {case_inputs.map((e: types.InputCaseTypes, i: number) => (
        <TableCell key={i}>
          <ChildComponent
            //@ts-ignore
            value={e[typed_input_key]}
            callback={(c: any) =>
              handleSetCaseInputParameter({
                case_id: e.case_id,
                value: c.target.value,
                key: input_key,
              })
            }
            //@ts-ignore
            optionvalues={select_option_values}
          />
        </TableCell>
      ))}
    </React.Fragment>
  );
};

export { AttributeRowMap };
