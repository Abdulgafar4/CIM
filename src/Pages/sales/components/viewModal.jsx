/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { EyeOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Modal, Table } from "antd";
import { useRef } from "react";
import { useState } from "react";
import { useReactToPrint } from "react-to-print";

const ViewButton = ({ record }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const componentRef = useRef();

  const handleViewClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const items = record.cartItems.map((item) => {
    return item
  })

  const columns = [
    {
      title: "Name", dataIndex: "name",
    },
    {
      title: "(₦) Price", dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "cartQuantity",
    },
    {
      title: "Total",
      dataIndex: "subTotal",
      render: (_, record) => <>{Number(record.price) * record.cartQuantity} </>,
    },
  ]

  return (
    <>
      <Button onClick={handleViewClick} icon={<EyeOutlined />} />
      <Modal
        title={
          <Breadcrumb
            items={[
              {
                href: "/",
                title: <HomeOutlined />,
              },
              {
                href: "/bills",
                title: <span>Bills</span>,
              },
              {
                href: "",
                title: <span>Bill Detail</span>,
              },
            ]}
          />
        }
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <div ref={componentRef} className="flex flex-col gap-2 w-5/6 mx-auto">
          <div className=" text-center my-2">
            <h2 className=" text-black font-bold text-lg uppercase">ORB Communications</h2>
            <p className="text-black font-bold">
              -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
              <br />Customer's Copy <br />
              -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
            </p>
          </div>
          <div className="">
            <p >
              <span className="text-black font-bold">

                Receipt ID: 
              </span>
              {" "}
              {record.id} </p>
            <p >

              <span className="text-black font-bold">

                Address: 
              </span>
              {" "}
              Omoda, Ilorin</p>
            <p >
              <span className="text-black font-bold">

                Date: 
              </span>
              {" "}
              {record.createdAt}</p>
            <p >
              <span className="text-black font-bold">
                Cashier: 
              </span>
              {" "}
              {record.addedby}</p>
          </div>
          <p className="text-black font-bold">
            -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
          </p>
          <Table
            columns={columns}
            dataSource={items}
            pagination={false}
          />
          <p className="text-black font-bold">
            -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
          </p>
          <h3 className="uppercase">
            <span className=" text-black font-semibold uppercase">
              Payment Method: 
            </span>
            {" "}
            {record.paymentmethod}
          </h3>
          <h3>
            <span className=" text-black font-semibold uppercase">
              Due: 
            </span>
            {" "}
            {record.remainingamount}</h3>
          <div className="text-center">
            <span>*********************</span>
            <h3 className="text-black font-bold">NGN {record.subTotal}</h3>
            <span>*********************</span>
          </div>
        </div>
        <div>
          <Button type='primary' className='bg-green-500 text-white' onClick={handlePrint}>Print</Button>
        </div>
      </Modal>
    </>
  );
};

export default ViewButton;
