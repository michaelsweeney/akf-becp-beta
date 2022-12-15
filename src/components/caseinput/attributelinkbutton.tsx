import { IconSvg, link_off_path, link_on_path } from "../svgicons";
import styled from "@mui/styled-engine";
import { StyledButton } from "styling/components";
import { Button } from "@mui/material";

type Props = {
  is_linked: boolean;
  callback: () => void;
};

const IconButton = styled(Button)({
  padding: "1px !important",
  marginLeft: "15px !important",
  minWidth: "30px !important",
  borderRadius: "0px",
});

const AttributeLinkButton = (props: Props) => {
  let { is_linked, callback } = props;

  return (
    <IconButton size="small" onClick={() => callback()}>
      <IconSvg
        d={is_linked ? link_on_path : link_off_path}
        fill={is_linked ? "gray" : "black"}
        width={25}
        height={20}
      />
    </IconButton>
  );
};
export { AttributeLinkButton };
