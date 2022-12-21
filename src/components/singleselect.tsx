import { SelectChangeEvent } from "@mui/material";
import { MenuItem, Select, FormControl } from "@mui/material";

type PropTypes = {
  value: string;
  callback: (d: string | number) => void;
  option_values: (string | number)[];
  option_titles?: string[];
  is_disabled?: boolean;
  is_blank?: boolean;
};

const SingleSelect = (props: PropTypes) => {
  const {
    value,
    callback,
    option_values,
    option_titles = option_values,
    is_disabled = false,
    is_blank = false,
  } = props;

  const handleChange = (e: SelectChangeEvent) => {
    callback(e.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" size="small" fullWidth>
        <Select
          sx={{ fontSize: "14px" }}
          size="small"
          disabled={is_disabled}
          value={is_blank === true ? "" : value}
          onChange={handleChange}
        >
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
