import emptyImg from "../../../assets/empty cart.webp";
import { Row, Space, Image, Button, Typography } from "antd";
import { Link } from "react-router-dom";

const { Text, Title } = Typography;

const EmptyCart = () => {
  return (
    <Row justify={"center"}>
      <Space direction='vertical' align='center' size={"small"}>
        <Image preview={false} width={500} src={emptyImg} />
        <Space direction='vertical' size={1} align='center'>
          <Title level={3}>Your shopping cart looks empty</Title>
          <Text> Let's fix that </Text>
        </Space>
        <Link to={"/recess-shop/products/"}>
          <Button size='large' type='primary'>
            Start Shopping
          </Button>
        </Link>
      </Space>
    </Row>
  );
};

export default EmptyCart;
