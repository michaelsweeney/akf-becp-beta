import styled from "@mui/styled-engine";

const FooterContainer = styled("div")<{ height: number }>((props) => ({
  width: "100%",
  padding: "15px",
  height: `${props.height}px`,
  boxSizing: "border-box",
  whiteSpace: "nowrap",
  overflow: "hidden",
  borderTop: "2px solid black",
}));

const Footer = (props: { height: number }) => {
  return (
    <FooterContainer height={props.height}>AKF BOCPT Beta v0.x</FooterContainer>
  );
};
export default Footer;
