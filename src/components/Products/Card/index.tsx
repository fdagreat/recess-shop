import styles from "./styles.module.css";
import { ProductRecord } from "../../../pocketbase/interfaces/products";
import { Card, Typography, Row, Badge } from "antd";
import { HeartOutlined } from "@ant-design/icons";

const { Text, Paragraph } = Typography;

interface propTypes {
  product: ProductRecord;
}

const ProductCard = ({ product }: propTypes) => {
  return (
    <Badge.Ribbon text={product.expand.categories.at(0).name}>
      <Card
        className={styles.card}
        hoverable
        cover={
          <div className={styles.imgcontainer}>
            <img
              className={styles.cardimg}
              alt={product.name}
              src={product.img}
            />
          </div>
        }
      >
        <Paragraph ellipsis type='secondary'>
          {product.name}
        </Paragraph>
        <Row justify={"space-between"}>
          <Text strong>EGP {product.price}</Text>
        </Row>
      </Card>
    </Badge.Ribbon>
  );
};

export default ProductCard;
