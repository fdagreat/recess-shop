import { ProductRecord } from "../../../pocketbase/interfaces/products";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Image,
  Space,
  Typography,
  InputNumber,
  Button,
  Spin,
} from "antd";
import { CartItemRecord } from "../../../pocketbase/interfaces/cart";
import { addCommasToNumber } from "../../../utils/formmating";

const { Text, Title } = Typography;

interface propTypes {
  item: CartItemRecord;
  handleItemUpdate: Function;
  handleItemRemove: Function;
  isBeingRemoved: boolean;
}

const ListItem = ({
  item,
  handleItemRemove,
  handleItemUpdate,
  isBeingRemoved,
}: propTypes) => {
  const product = item.expand?.item as ProductRecord;
  return (
    <Col span={25}>
      <Spin indicator={<LoadingOutlined />} spinning={isBeingRemoved}>
        <Row>
          <Col span={15}>
            <Image
              preview={false}
              height={240}
              width={240}
              src={(item.expand?.item as ProductRecord).img}
            ></Image>
          </Col>
          <Col span={7}>
            <Row justify={"space-between"}>
              <Col span={5}>
                <Space direction='vertical' >
                  <Space direction='vertical'>
                    <Text>{product.name}</Text>
                    <Text type='secondary'>{addCommasToNumber(product.amount)} item(s) left</Text>
                  </Space>
                  <Space direction="vertical" align="center" size={10}>
                  <Text type='secondary' italic>
                      (In cart)
                    </Text>
                    <InputNumber
                      defaultValue={item.quantity}
                      min={1}
                      max={product.amount}
                      onChange={(val) => {
                        handleItemUpdate(item.id, item.item, val);
                      }}
                    />
                  </Space>
                </Space>
              </Col>
              <Col span={5}>
                <Space direction='vertical' align='center' size={60}>
                  <Title level={4}>
                    {addCommasToNumber(product.price)} <Text>TZS</Text>
                  </Title>
                  <Button
                    type='ghost'
                    onClick={() => {
                      handleItemRemove(item.id, item.item);
                    }}
                    icon={<DeleteOutlined />}
                  >
                    Remove
                  </Button>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </Spin>
    </Col>
  );
};

export default ListItem;
