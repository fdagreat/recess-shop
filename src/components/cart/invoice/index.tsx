import { CartItemRecord } from "../../../pocketbase/interfaces/cart";
import { ProductRecord } from "../../../pocketbase/interfaces/products";
import { Card, Row, Col, Typography, Space, Divider, Button } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import { addCommasToNumber } from "../../../utils/formmating";

const { Title, Text } = Typography;

interface propTypes {

  totalItems: number;
  totalInvoice: string;
}

const Invoice = ({ totalInvoice, totalItems }: propTypes) => {
  return (
    <Card>
      <Row align={"middle"} gutter={[0, 100]}>
        <Col span={24}>
          <Row justify={"space-between"}>
            <Space>
              <Title level={2}>Total </Title>
              <Text type='secondary' strong={false}>
                (Inclusive of VAT)
              </Text>
            </Space>

            <Title level={2}>{addCommasToNumber(totalInvoice)} TZS</Title>
          </Row>
          <Divider />
          <Row justify={"space-between"}>
            <Text type='secondary'>Subtotal ({addCommasToNumber(totalItems)})</Text>

            <Text>{addCommasToNumber(totalInvoice)} TZS</Text>
          </Row>
          <Row justify={"space-between"}>
            <Text type='secondary'>Shipping</Text>

            <Text strong type='success'>
              Free
            </Text>
          </Row>
        </Col>

        <Col span={24}>
          <Row justify={"center"}>
            <Button type='primary' size='large' icon={<ShoppingOutlined />}>
              Check Out
            </Button>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default Invoice;
