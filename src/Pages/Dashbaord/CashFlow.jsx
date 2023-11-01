import { Card, Col } from "antd";
import { colors } from "../../colors";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useContext, useState, useEffect } from "react";
import { fetchData } from "../../API";
import { AuthContext } from "../../context/AuthContext";
import { getMonthlyTotals } from "./mock/MockData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function CashFlow() {
  const [loading, setLoading] = useState(false);
  const [salesData, setData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;

  useEffect(() => {
    fetchData(userId, "bill", setLoading, setData);
    fetchData(userId, "expenses", setLoading, setExpensesData);
  }, [userId]);

  { loading && console.log("loading"); }
   const options = {
    // responsive: true,
    plugins: {
      legend: {
          display: true,
      }
  },
    scales: {
      x: {
        grid: {
          display: false
        },
        min: new Date('January').valueOf(),
        max: new Date('December').valueOf()
      },
      y: {
        ticks: {
          callback: (value) => value + 'K'
        },
        grid: {
          display: false
        }
      }

    }
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  
  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: getMonthlyTotals(salesData),
        borderColor: colors.green,
        backgroundColor: colors.green,
        tension: 0.5
      },
      {
        label: "Expenses",
        data: getMonthlyTotals(expensesData),
        backgroundColor: 'rgb(53, 162, 235)',
        borderColor: 'rgb(53, 162, 235)',
        tension: 0.5
      },
    ],
  };
  return (
    <Col className="hidden min-[550px]:block">
      <Card
        title="Cash Flow"
        headStyle={{
          borderLeftColor: colors.green,
          borderLeftWidth: "3px",
          color: colors.green,
        }}
      >
        <div className="w-full flex">
        <Line style={{ display: "flex", flexGrow: 1, height: "398px"}} data={data} options={options} />
        </div>
      </Card>
    </Col>
  );
}

export default CashFlow;
