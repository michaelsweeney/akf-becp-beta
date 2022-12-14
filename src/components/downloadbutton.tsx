import { htmlTableToCsv } from "dataformat/htmltable";
import { MutableRefObject } from "react";

import { StyledButton } from "styles/components";

const DownloadButton = (props: { tableref: MutableRefObject<null> }) => {
  const handleClick = () => {
    if (props.tableref.current) {
      let csv_string = htmlTableToCsv(
        props.tableref.current as HTMLTableElement
      );
      let encoded_uri = encodeURI(csv_string as string);
      window.open(encoded_uri);
    }
  };

  return <StyledButton onClick={handleClick}>Download CSV</StyledButton>;
};

export default DownloadButton;
