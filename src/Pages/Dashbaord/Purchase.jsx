import { Card, Col, Table, Tag } from "antd"
import { colors } from "../../colors"
import { AuthContext } from "../../context/AuthContext";
import { fetchData } from "../../API";
import { useEffect, useState, useContext } from "react";

function RecentPurchases() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;

  useEffect(() => {
    fetchData(userId, "purchases", setLoading, setData);
  }, [userId]);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'date',
      responsive: ['sm'],
    },
    {
      title: 'Supplier',
      dataIndex: 'supplier',
      key: 'supplier',
      responsive: ['md'],
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentstatus',
      key: 'status',
      render: (_, { paymentstatus }) => (
        <>
          <Tag color={paymentstatus === 'UnPaid' ? 'red' : paymentstatus === 'Paid' ? 'green' : 'yellow'}>
            {paymentstatus}
          </Tag>
        </>
      ),
    },
  ];

  return (
    <Col className="">
      <Card title="Recent Purchase" headStyle={{ borderLeftColor: colors.green, borderLeftWidth: "3px", color: colors.green }}>
        <Table bordered pagination={false} columns={columns} dataSource={data.slice(0, 5)} loading={loading} />
      </Card>
    </Col>
  )
}

export default RecentPurchases