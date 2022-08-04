import InputForm from "./inputform";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    margin: 50,
    border: "5px solid black",
    boxSizing: "border-box",
  },
});

const InputContainer = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <InputForm />
    </div>
  );
};

export default InputContainer;
