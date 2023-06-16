import { Card, Col, Table } from "antd"
import { colors } from "../../colors"

export default function Expenses() {
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <a href="/sales">{text}</a>,
    },
    {
      title: 'Purpose',
      dataIndex: 'purpose',
      key: 'purpose',
      responsive: ['sm'],
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      responsive: ['lg'],
    },
  ];

  const data = [
    {
      key: '1',
      date: 'John Brown',
      purpose: 'Petrol',
      amount: '$340'
    },
  ];
  return (
    <Col className="">
     <Card title="Other Expenses" headStyle={{borderLeftColor: colors.green, borderLeftWidth: "3px", color: colors.green }}>
      <Table bordered pagination={false} columns={columns} dataSource={data} />
     </Card>
    </Col>
  )
}