import { SelectChangeEvent } from "@mui/material";
import { MenuItem, Select, FormControl } from "@mui/material";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {},
  selectContainer: {
    // margin: 10,
    // marginBottom: 15,
    // padding: 0,
    // width: 200,
  },
});

type Props = {
  value: string;
  callback: (d: SelectChangeEvent) => void;
  optionvalues: string[];
  optiontitles?: string[];
};

const SingleSelect = (props: Props) => {
  const { value, callback, optionvalues, optiontitles = optionvalues } = props;
  const classes = useStyles();

  return (
    <div className={classes.selectContainer}>
      <FormControl variant="standard" size="small" fullWidth>
        <Select value={value} onChange={callback}>
          {optionvalues.map((d, i) => {
            return (
              <MenuItem key={i} value={d}>
                {optiontitles[i]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export { SingleSelect };
