import { Card, Col, Row } from "antd";
import { detailCardData } from "./mock/MockData";


function DetailCard() {
  return (
    <Row className="flex flex-row gap-10 justify-center pt-8">
   {detailCardData.map((data, index) => (    
   <Col key={index} className="shadow-md max-w-md min-w-[200px] w-48 flex-grow">
      <Card >
      <div className="flex flex-row items-center justify-between">
        <div className="text-white bg-green-400 p-5 rounded-full">
          {data.icon}
        </div>
        <div>
        <p className="pb-2 text-base text-gray-500">{data.title}</p>
        <p className="text-green-600">${data.amount}</p>
        </div>
        
      </div>
      </Card>
    </Col>))}
  </Row>
  )
}

export default DetailCard