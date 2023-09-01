import { useLocation } from "react-router-dom";
const Report = () => {
  const { state } = useLocation();
  console.log(state);
  return <>Report</>;
};

export default Report;
