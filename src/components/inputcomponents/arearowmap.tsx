import React from "react";

import * as types from "types";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { AttributeLinkButton } from "./attributelinkbutton";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { setCaseAreaInputParameter } from "store/caseinputslice";

import { setLinkedAttribute } from "store/uislice";
import { SelectChangeEvent } from "@mui/material";

//@ts-ignore
function addPropsToReactElement(element, props) {
  if (React.isValidElement(element)) {
    return React.cloneElement(element, props);
  }
  return element;
}

//@ts-ignore
function addPropsToChildren(children, props) {
  if (!Array.isArray(children)) {
    return addPropsToReactElement(children, props);
  }
  return children.map((childElement) =>
    addPropsToReactElement(childElement, props)
  );
}

type PropTypes = {
  area_id: number;
  title: string;
  area_key: string;
  child_props: {
    optionvalues?: string[];
  };
  component: React.FunctionComponent;
};

const AreaRowMap = (props: PropTypes) => {
  const { area_id, title, area_key, child_props, component } = props;
  const ChildComponent = component;

  const dispatch = useAppDispatch();
  let { case_inputs, ui_settings } = useAppSelector((state) => state);
  let { linked_attributes } = ui_settings;
  let { global_inputs, design_areas } = case_inputs;
  let case_ids = [...new Set(global_inputs.map((d) => d.case_id))];

  const handleSetCaseAreaInputParameter = (
    payload: types.CaseAreaInputParametersPayload
  ) => {
    dispatch(setCaseAreaInputParameter(payload));
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
    <TableRow>
      <TableCell />
      <TableCell>
        <AttributeLinkButton
          callback={() => handleAttributeLinkClick(area_key)}
          is_linked={linked_attributes.building_type}
        />
      </TableCell>
      <TableCell variant="head">{title}</TableCell>

      {case_ids.map((case_id, i) => {
        let area_obj = design_areas.find(
          (d) => d.case_id === case_id && d.area_id === area_id
        );

        let props_to_add = {
          ...child_props,
          //@ts-ignore
          value: area_obj[area_key],
          callback: (c: SelectChangeEvent) =>
            handleSetCaseAreaInputParameter({
              case_id: case_id,
              area_id: area_id,
              //@ts-ignore
              value: c.target.value,
              key: area_key,
            }),
        };

        return (
          <TableCell key={i}>
            {/* @ts-ignore */}
            <ChildComponent
              //@ts-ignore*
              {...props_to_add}
            />
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export { AreaRowMap };
