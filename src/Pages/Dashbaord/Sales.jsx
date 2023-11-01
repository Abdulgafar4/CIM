import { Card, Col, Table, Tag } from "antd"
import { colors } from "../../colors"
import { AuthContext } from "../../context/AuthContext";
import { fetchData } from "../../API";
import { useEffect, useState, useContext } from "react";

function Sales() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.uid;

  useEffect(() => {
    fetchData(userId, "bill", setLoading, setData);
  }, [userId]);


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      responsive: ['sm'],
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      responsive: ['md'],
    },
    {
      title: 'Customer',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentstatus',
      key: 'paymentstatus',
      render: (_, { paymentstatus }) => (
        <Tag color={paymentstatus === 'UnPaid' ? 'red' : paymentstatus === 'Paid' ? 'green' : 'yellow'} >
          {paymentstatus}
        </Tag>
      ),
    },
  ];

  return (
    <Col className="shadow-md flex-grow">
      <Card title="Recent Sales" headStyle={{ borderLeftColor: colors.green, borderLeftWidth: "3px", color: colors.green }}>
        <Table bordered pagination={false} columns={columns} dataSource={data.slice(0, 5)} loading={loading} />
      </Card>
    </Col>
  )
}

export default Sales