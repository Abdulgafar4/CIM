import { Card, Col } from "antd"
import { colors } from "../../colors"
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function Graph() {
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
        label: "Sales",
        data: [2000, 2001, 3002, 3003, 4004, 4005, 5006, 5007],
        borderColor: colors.green,
        backgroundColor: colors.green,
        tension: 0.5
      },
      {
        label: "Purchase",
        data: [2001, 2002, 3003, 3004, 4005, 5006, 6006, 7007],
        backgroundColor: 'rgb(53, 162, 235)',
        borderColor: 'rgb(53, 162, 235)',
        tension: 0.5
      },
    ],
  };
  return (
    <Col className="hidden min-[550px]:block">
    <Card title="Sales vs Purchase" headStyle={{borderLeftColor: colors.green, borderLeftWidth: "3px", color: colors.green }}>
    <div className="w-full flex">
        <Bar style={{ display: "flex", flexGrow: 1, height: "398px"}} data={data} options={options} />
        </div>
    </Card>
    </Col>
  )
}

export default Graph