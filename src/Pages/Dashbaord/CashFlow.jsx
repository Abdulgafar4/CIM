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
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: [2000, 2001, 3002, 3003, 4004, 4005, 5006, 5007],
        borderColor: colors.green,
        backgroundColor: colors.green,
        tension: 0.5
      },
      {
        label: "Expenses",
        data: [2001, 2002, 3003, 3004, 4005, 5006, 6006, 7007],
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
