import { SelectChangeEvent } from "@mui/material";
import { MenuItem, Select, FormControl } from "@mui/material";

type PropTypes = {
  value: string;
  callback: (d: string | number) => void;
  option_values: string[];
  option_titles?: string[];
  is_disabled?: boolean;
};

const SingleSelect = (props: PropTypes) => {
  const {
    value,
    callback,
    option_values,
    option_titles = option_values,
    is_disabled = false,
  } = props;

  const handleChange = (e: SelectChangeEvent) => {
    callback(e.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" size="small" fullWidth>
        <Select disabled={is_disabled} value={value} onChange={handleChange}>
          {option_values.map((d, i) => {
            return (
              <MenuItem key={i} value={d}>
                {option_titles[i]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export { SingleSelect };
