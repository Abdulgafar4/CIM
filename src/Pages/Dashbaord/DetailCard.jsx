import { Card, Col, Row } from "antd";
import { detailCardData } from "./mock/MockData";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchData } from "../../API";
import { AuthContext } from "../../context/AuthContext";


function DetailCard() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;

  useEffect(() => {
    fetchData(userId, "bill", setLoading, setData);
    fetchData(userId, "expenses", setLoading, setExpensesData);
  }, [userId]);

  {loading && console.log("loading");}

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // 0 indexed

  // Filter for current year and month
  const currentData = data.filter(item => {
    const itemDate = new Date(item.createdAt);

    return itemDate.getFullYear() === currentYear &&
      itemDate.getMonth() + 1 === currentMonth;
  });
  const currentExpensesData = expensesData.filter(item => {
    const itemDate = new Date(item.createdAt);

    return itemDate.getFullYear() === currentYear &&
      itemDate.getMonth() + 1 === currentMonth;
  });
  // Calculate total
  const currentMonthTotalAmount = currentData.reduce((acc, item) => {
    return acc + item.subTotal;
  }, 0);

  const expensesCurrentMonthTotalAmount = currentExpensesData.reduce((acc, item) => {
    return acc + Number(item.amount);
  }, 0);

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
                <p className="text-green-600">₦ {data.title === "Sales" ? currentMonthTotalAmount : data.title === "Expenses" ? expensesCurrentMonthTotalAmount : data.amount}</p>
              </div>

            </div>
          </Card>
        </Col>))}
    </Row>
  )
}

export default DetailCard