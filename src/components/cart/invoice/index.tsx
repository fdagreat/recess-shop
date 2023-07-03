import { CartItemRecord } from "../../../pocketbase/interfaces/cart";
import {
  Card,
  Row,
  Col,
  Typography,
  Divider,
  Button,
  message,
  Select,
  Input,
} from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import { addCommasToNumber } from "../../../utils/formmating";
import { Record } from "pocketbase";
import { Admin } from "pocketbase";
import { checkout } from "../../../pocketbase/routes/order";
import { RadioChangeEvent, Radio } from "antd";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const { Title, Text } = Typography;

interface InvoiceProps {
  totalItems: number;
  totalInvoice: string;
  user: Record | Admin | null;
  cartItems: CartItemRecord[];
}

export interface paymentMethodOption {
  label: string;
  value: string;
}

export interface shippingAddressOption {
  label: string;
  value: string;
  shippingFee: number;
}



const shippingAddressOptions = [
  { value: "dar-es-salaam", label: "Inside Dar es salaam", shippingFee: 0 },
  {
    value: "other-tanzania",
    label: "Other Regions in Tanzania",
    shippingFee: 5000,
  },
  { value: "east-africa", label: "East Africa", shippingFee: 10000 },
  { value: "other", label: "Other Locations", shippingFee: 20000 },
];

const paymentMethodOptions = [
  { label: "Cash on Delivery", value: "cod" },
  { label: "Credit Card", value: "credit" },
  { label: "Mobile Money", value: " mobile" },
];

const Invoice = ({
  totalInvoice,
  totalItems,
  user,
  cartItems,
}: InvoiceProps) => {
  const [paymentMethodOption, setPaymentMethodOption] = useState(
    paymentMethodOptions[0].value
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shippingAddress, setShippingAddress] = useState(
    shippingAddressOptions[0].value
  );
  const [shippingFee, setShippingFee] = useState(0);

  const paymentMethodOnChange = (value: string) => {
    setPaymentMethodOption(value);
  };

  const phoneNumberOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const shippingAddressOnChange = (value: string) => {
    const selectedOption = shippingAddressOptions.find(
      (option) => option.value === value
    );
    if (selectedOption) {
      setShippingAddress(value);
      setShippingFee(selectedOption.shippingFee);
    }
  };

  const handleCheckout = async (
    user: Record | Admin | null,
    totalInvoice: string,
    totalItems: number,
    cartItems: CartItemRecord[],
    shippingAddress: shippingAddressOption["value"],
    paymentMethodOption: paymentMethodOption["value"],
    shippingFee: number,
    phoneNumber: string
  ) => {
   
    setIsCheckingOut(true);
  
    if (user === null) {
      message.error("Please login to continue");
      window.location.href = "/recess-shop/auth/login";
      return;
    }
  
    if (phoneNumber === "" || phoneNumber.length < 10) {
      message.error("Please enter a valid phone number");
      return;
    }
  
    if (totalItems === 0) {
      message.error("Your cart is empty");
      return;
    }
  
    const { responseMessage, error } = await checkout(
      user,
      totalInvoice,
      totalItems,
      cartItems,
      shippingAddress,
      paymentMethodOption,
      shippingFee,
      phoneNumber
    );
  
    setIsCheckingOut(false);
  
    if (error) {
      message.error(responseMessage);
    }
  
    if (!error) {
      message.success(' Your order has been placed successfully! We will contact you shortly.');
      window.location.href = "/recess-shop/";
    }
  };
  return (
    <Card>
      <Row align="middle" gutter={[0, 50]}>
        <Col span={22}>
          <Row justify="center">
            <Title level={2}>Order Details</Title>
          </Row>{" "}
          <Divider />
          <Title level={5}>Delivery Details</Title>
          <Row justify="space-between">
            <Text type="secondary">Shipping Address</Text>
            <Select
              value={shippingAddress}
              onChange={shippingAddressOnChange}
              options={shippingAddressOptions}
              style={{ width: 210 }}
            />
          </Row>
          <br />
          <Row justify="space-between">
            <Text type="secondary">Payment Method</Text>
            <Select
              value={paymentMethodOption}
              onChange={paymentMethodOnChange}
              style={{ width: 160 }}
              options={paymentMethodOptions}
            ></Select>
          </Row>
          <br />
          <Row justify="space-between">
            <Text type="secondary">Email</Text>
            <Text strong type="success">
              {user?.email}
            </Text>
          </Row>
          <br />
          <Row justify="space-between">
            <Text type="secondary">Phone Number</Text>
            <Input
              style={{ width: 120 }}
              value={phoneNumber}
              onChange={phoneNumberOnChange}
            />
          </Row>
          <Divider />
          <Title level={5}>Cost Summary</Title>
          <Row justify="space-between">
            <Text type="secondary">
              Subtotal ({addCommasToNumber(totalItems)})
            </Text>
            <Text>{addCommasToNumber(totalInvoice)} TZS</Text>
          </Row>
          <Row justify="space-between">
            <Text type="secondary">Shipping Fee</Text>
            {shippingFee === 0 ? (
              <Text strong type="success">
                Free
              </Text>
            ) : (
              <Text strong type="success">
                {addCommasToNumber(shippingFee)} TZS
              </Text>
            )}
          </Row>
          <Divider />
          <Row justify="space-between">
            <Col>
              <Title level={2}>Total</Title>
            </Col>
            <Col>
              <Title level={2}>
                {addCommasToNumber(parseInt(totalInvoice) + shippingFee)} TZS
              </Title>
            </Col>
          </Row>
          <Row justify="center">
            <Button
              type="primary"
              size="large"
              icon={<ShoppingOutlined />}
              onClick={() => {
                handleCheckout(
                  user,
                  totalInvoice,
                  totalItems,
                  cartItems,
                  shippingAddress,
                  paymentMethodOption,
                  shippingFee,
                  phoneNumber
                );
              }}
              loading={isCheckingOut}
            >
              Check Out
            </Button>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default Invoice;
