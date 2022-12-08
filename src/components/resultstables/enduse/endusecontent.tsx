import EnduseTableControls from "./endusetablecontrols";
import EnduseTable from "./endusetable";
interface PropTypes {}

const EnduseContent = (props: PropTypes) => {
  return (
    <div>
      <EnduseTableControls />
      <EnduseTable />
    </div>
  );
};
export default EnduseContent;
