import { CircularProgress } from "@mui/material";
// import { Backdrop } from "@mui/material";

const LoadingSpinner = (props) => {
  let { isLoading } = props;
  return (
    <div>hii</div>
    // <Backdrop
    //   sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //   open={isLoading}
    // >
    //   <CircularProgress color="inherit" />
    // </Backdrop>
  );
};

export { LoadingSpinner };
