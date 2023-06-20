import { Card, Col, Table, Tag } from "antd"
import { colors } from "../../colors"

function RecentSales() {
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
      title: 'Supplier',
      dataIndex: 'supplier',
      key: 'supplier',
      responsive: ['md'],
    },
    {
      title: 'Payment Status',
      dataIndex: 'status',
      key: 'status',
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
      supplier: 'John Doe',
      status: ['Paid']
    },
    {
      key: '2',
      name: 'John Brown',
      date: '23-08-2020',
      supplier: 'John Doe',
      status: ['UnPaid']
    },
    {
      key: '3',
      name: 'John Brown',
      date: '23-08-2020',
      supplier: 'John Doe',
      status: ['Partial']
    },
  ];
  return (
    <Col className="">
     <Card title="Recent Purchase" headStyle={{borderLeftColor: colors.green, borderLeftWidth: "3px", color: colors.green }}>
      <Table bordered pagination={false} columns={columns} dataSource={data.slice(0,5)} />
     </Card>
    </Col>
  )
}

export default RecentSales