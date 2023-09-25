import { Card, Col, Table } from "antd"
import { colors } from "../../colors"
import { AuthContext } from "../../context/AuthContext";
import { fetchData } from "../../API";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";

export default function Expenses() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;

  useEffect(() => {
    fetchData(userId, "expenses", setLoading, setData);
  }, [userId]);
  const columns = [
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => <a href="/sales">{text}</a>,
      responsive: ['sm'],
    },
    {
      title: 'Purpose',
      dataIndex: 'purpose',
      key: 'purpose',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  return (
    <Col className="">
     <Card title="Other Expenses" headStyle={{borderLeftColor: colors.green, borderLeftWidth: "3px", color: colors.green }}>
      <Table bordered pagination={false} columns={columns} dataSource={data.slice(0, 5)} loading={loading} />
     </Card>
    </Col>
  )
}
