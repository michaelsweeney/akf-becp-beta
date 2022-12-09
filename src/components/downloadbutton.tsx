import { htmlTableToCsv } from "dataformat/htmltable";
import { MutableRefObject } from "react";

import { StyledButton } from "styles/components";

const DownloadButton = (props: { tableref: any }) => {
  const handleClick = () => {
    if (props.tableref.current) {
      htmlTableToCsv(props.tableref.current);
    }
  };

  return <StyledButton onClick={handleClick}>Download CSV</StyledButton>;
};

export default DownloadButton;
