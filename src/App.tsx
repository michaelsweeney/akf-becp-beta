import React, { useEffect, useState } from "react";
// import "./App.css";
// import { connect, ConnectedProps } from "react-redux";
// import { makeStyles } from "@material-ui/styles";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { RootState } from "./store";
// import * as api from "./apicalls";

// import {
//   // InputCaseInputTypes,
//   // InputCaseAreaTypes,
//   OutputStateTypes,
// } from "./store/statetypes";

// const theme = createTheme({
//   palette: {
//     secondary: {
//       main: "#cf202e",
//     },
//     primary: {
//       main: "#283759",
//     },
//   },
// });

// const useStyles = makeStyles({
//   root: {
//     width: "calc(100vw)",
//     height: "calc(100vh)",
//     boxSizing: "border-box",
//   },
//   main: {
//     width: "100%",
//     height: "100%",
//     boxSizing: "border-box",
//     padding: 10,
//   },
//   header: {
//     display: "block",
//     width: "100%",
//     height: "75px",
//     boxSizing: "border-box",
//   },
//   topMain: {
//     display: "block",
//     height: "calc(100% - 250px - 75px)",
//     width: "calc(100%)",
//     boxSizing: "border-box",
//     padding: 10,
//   },
//   topLeft: {
//     padding: 10,
//     display: "inline-block",
//     width: "250px",
//     height: "100%",
//     boxSizing: "border-box",
//     verticalAlign: "top",
//     overflow: "auto",
//   },
//   topRight: {
//     display: "inline-block",
//     width: "calc(100% - 250px)",
//     height: "100%",
//     boxSizing: "border-box",
//     verticalAlign: "top",
//   },

//   bottom: {
//     padding: 10,
//     height: "250px",
//     width: "calc(100%)",
//     boxSizing: "border-box",
//   },
//   bottomMain: {
//     display: "inline-block",
//     width: "calc(100%)",
//     height: "100%",
//     boxSizing: "border-box",

//     // border: "black solid 1px",
//   },
// });

// const App = (props: { case_inputs: OutputStateTypes }) => {
//   const classes = useStyles();
//   let { case_inputs } = props;

//   console.log(case_inputs);

//   const updateResults = () => {
//     // api.getProjectionFromReferenceBuildings(
//     //   case_inputs,
//     //   props.actions.setCaseResults,
//     //   props.actions.setIsLoading
//     // );
//   };

//   useEffect(() => {
//     updateResults();
//   }, []);

//   return (
//     <ThemeProvider theme={theme}>
//       hey
//       {/* <InputContainer /> */}
//     </ThemeProvider>
//   );
// };

import { useAppSelector, useAppDispatch } from "./store/hooks";
import {
  select_is_loading_error,
  setIsLoadingError,
} from "./store/caseoutputslice";




const App = () => {
  const is_error = useAppSelector(select_is_loading_error);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>{`Is an Error? ${is_error}`}</div>
      <button onClick={() => dispatch(setIsLoadingError(!is_error))}>
        toggle_is_error
      </button>
    </div>
  );
};

//@ts-ignore
export default App;
