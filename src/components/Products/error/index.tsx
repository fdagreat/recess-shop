import React from "react";
import { Button, Result, Row } from "antd";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const ProductsFetchError = () => {
  return (
    <Row justify={"center"} align='middle' className={styles.errorContainer}>
      <Result
        status='500'
        title='Loading Products Failed'
        subTitle='Sorry, something went wrong.'
        extra={
          <Link to={"/"}>
            <Button type='primary'>Back Home</Button>
          </Link>
        }
      />
    </Row>
  );
};

export default ProductsFetchError;
