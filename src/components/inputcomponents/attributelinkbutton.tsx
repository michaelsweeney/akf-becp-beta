import { useEffect, useState } from "react";
import React from "react";

import { IconSvg, link_off_path, link_on_path } from "../svgicons";
import { Button } from "@mui/material";

type Props = {
  is_linked: boolean;
  callback: (e: any) => any;
};
const AttributeLinkButton = (props: Props) => {
  let { is_linked, callback } = props;

  return (
    <Button onClick={(e) => callback(e)}>
      <IconSvg
        d={is_linked ? link_on_path : link_off_path}
        fill={is_linked ? "black" : "gray"}
      />
    </Button>
  );
};
export { AttributeLinkButton };
