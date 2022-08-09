import { SelectChangeEvent } from "@mui/material";
import { MenuItem, Select, FormControl } from "@mui/material";

type PropTypes = {
  value: string;
  callback: (d: SelectChangeEvent) => void;
  optionvalues: string[];
  optiontitles?: string[];
};

const SingleSelect = (props: PropTypes) => {
  const { value, callback, optionvalues, optiontitles = optionvalues } = props;

  return (
    <div>
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
