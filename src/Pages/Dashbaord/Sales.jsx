import { Card, Col, Table, Tag } from "antd"
import { colors } from "../../colors"

function Attendance() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a href="/purchase">{text}</a>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      responsive: ['sm'],
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      responsive: ['md'],
    },
    {
      title: 'Payment Status',
      dataIndex: 'status',
      key: 'status',
      responsive: ['lg'],
      render: (_, { status }) => (
        <>
          {status.map((tag) => {
            let color = tag === 'UnPaid' ? 'red' : tag === 'Paid' ? 'green' : 'yellow';
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      date: '23-08-2020',
      customer: 'John Doe',
      status: ['Paid']
    },
    {
      key: '2',
      name: 'John Brown',
      date: '23-08-2020',
      customer: 'John Doe',
      status: ['UnPaid']
    },
    {
      key: '3',
      name: 'John Brown',
      date: '23-08-2020',
      customer: 'John Doe',
      status: ['Partial']
    },
  ];
  return (
    <Col className="shadow-md flex-grow">
    <Card title="Recent Sales" headStyle={{borderLeftColor: colors.green, borderLeftWidth: "3px", color: colors.green }}>
    <Table bordered pagination={false} columns={columns} dataSource={data.slice(0,5)} />
    </Card>
    </Col>
  )
}

export default Attendance