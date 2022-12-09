import CarbonTableControls from "./carbontablecontrols";
import CarbonProjectionTable from "./carbonprojectiontable";
import CarbonSummaryTable from "./carbonsummarytable";

const CarbonContent = () => {
  return (
    <div>
      <CarbonTableControls />
      <CarbonSummaryTable />
      <CarbonProjectionTable />
    </div>
  );
};
export default CarbonContent;
