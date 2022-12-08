import { IconSvg, link_off_path, link_on_path } from "../svgicons";
import { Button } from "@mui/material";
import styled from "@mui/styled-engine";

type Props = {
  is_linked: boolean;
  callback: () => void;
};

const StyledButton = styled(Button)`
  padding: "0px !important";
  margin: "0px !important";
`;

const AttributeLinkButton = (props: Props) => {
  let { is_linked, callback } = props;

  return (
    <StyledButton size="small" onClick={() => callback()}>
      <IconSvg
        d={is_linked ? link_on_path : link_off_path}
        fill={is_linked ? "gray" : "black"}
        width={25}
        height={20}
      />
    </StyledButton>
  );
};
export { AttributeLinkButton };
