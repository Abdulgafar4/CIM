import { Card, Col, Row } from "antd";
import { detailCardData, getCurrentMonthTotalAmount, getMonthlyTotals, getYearlyTotal } from "./mock/MockData";
import { useContext, useState, useEffect } from "react";
import { fetchData } from "../../API";
import { AuthContext } from "../../context/AuthContext";


function DetailCard() {
  const [loading, setLoading] = useState(false);
  const [salesData, setData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [purchasesData, setPurchasesData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;

  useEffect(() => {
    fetchData(userId, "bill", setLoading, setData);
    fetchData(userId, "expenses", setLoading, setExpensesData);
    fetchData(userId, "purchases", setLoading, setPurchasesData);
  }, [userId]);

  { loading && console.log("loading"); }

  const salesAmount = getCurrentMonthTotalAmount(salesData);
  const expensesAmount = getCurrentMonthTotalAmount(expensesData);
  const purchasesAmount = getCurrentMonthTotalAmount(purchasesData);
  const monthlySales = getMonthlyTotals(salesData);
  const monthlyExpenses = getMonthlyTotals(expensesData);
  const monthlyPurchases = getMonthlyTotals(purchasesData);
  const yearlySales = getYearlyTotal(monthlySales)
  const yearlyExpenses = getYearlyTotal(monthlyExpenses)
  const yearlyPurchases = getYearlyTotal(monthlyPurchases)

  const cashflow = yearlySales + yearlyExpenses + yearlyPurchases;

  function getAmount(data) {
    if (data.title === "Sales") return salesAmount;
    if (data.title === "Expenses") return expensesAmount;
    if (data.title === "Purchases") return purchasesAmount;

    return cashflow;
  }

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
                <p className="text-green-600">₦ {getAmount(data)}</p>
              </div>

            </div>
          </Card>
        </Col>))}
    </Row>
  )
}

export default DetailCard