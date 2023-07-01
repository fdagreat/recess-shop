import { Row, Col, Typography } from "antd";
import { HeartFilled } from "@ant-design/icons";
import styles from "./styles.module.css";

const { Text } = Typography;

const PageFooter = () => {
  return (
    <Row justify='center' align='middle' wrap>
      <Col className={styles.credit} span={24}>
        <Text type='secondary'>
          Recess site © 2023 - Made with <HeartFilled />
        </Text>
      </Col>
      {/* <Col className={styles.credit} span={24}>
        <Text type='secondary'>Github | LinkedIn</Text>
      </Col> */}
    </Row>
  );
};

export default PageFooter;
