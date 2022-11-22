import { CircularProgress } from "@mui/material";
import { useAppSelector } from "store/hooks";
import styled from "styled-components";

const Background = styled("div")<{ active: boolean }>((props) => ({
  zIndex: 999999,
  width: "100vw",
  height: "100vh",
  position: "absolute",
  backgroundColor: "rgba(20, 20, 20, 0.5)",
  display: props.active ? "flex" : "none",
  alignItems: "center",
  justifyContent: "center",
}));

const SpinnerContainer = styled("div")<{}>((props) => ({}));

const LoadingSpinner = () => {
  const { is_api_loading } = useAppSelector((state) => state.ui_settings);

  return (
    <Background active={is_api_loading}>
      <SpinnerContainer>
        <CircularProgress />
      </SpinnerContainer>
    </Background>
  );
};

export default LoadingSpinner;
