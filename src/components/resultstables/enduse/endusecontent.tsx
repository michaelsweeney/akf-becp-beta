import EnduseTable from "./endusetable";
import EnduseSummaryTable from "./endusesummarytable";
interface PropTypes {}

const EnduseContent = (props: PropTypes) => {
  return (
    <div>
      <EnduseSummaryTable />
      <EnduseTable />
    </div>
  );
};
export default EnduseContent;
