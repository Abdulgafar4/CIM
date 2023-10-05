import { Col, Row } from "antd";
import Sales from "./Sales";
import DetailCard from "./DetailCard";
import Graph from "./Graph";
import Purchase from "./Purchase";
import CashFlow from "./CashFlow";
import Expenses from "./Expenses";

function Dashboard() {
  return (
    <div className="flex flex-col xl:flex-row w-full gap-8">
      <Row className="flex flex-col gap-10 xl:w-9/12">
        <DetailCard />
        <Graph />
        <Sales />
      </Row>
      <Col className="flex flex-col pt-8 gap-10 xl:w-[34rem]">
        <CashFlow />
        <Expenses />
        <Purchase />
      </Col>
    </div>
  );
}

export default Dashboard;
