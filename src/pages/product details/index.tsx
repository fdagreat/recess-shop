import styles from "./styles.module.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Row,
  Col,
  Space,
  Image,
  Typography,
  Button,
  message,
  InputNumber,
  Card,
} from "antd";
import { getProdcutByID } from "../../pocketbase/routes/products";
import {
  CarOutlined,
  LockOutlined,
  ReloadOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import LoadingProducts from "../../components/Products/Loading";
import useAuth from "../../hooks/useAuth";
import { addItemToCart } from "../../pocketbase/routes/cart";
import { ProductRecord } from "../../pocketbase/interfaces/products";

const { Title, Text } = Typography;

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const productQuery = useQuery(["product", id!], getProdcutByID, { retry: 2 });
  const cartMutation = useMutation(addItemToCart, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        "cartItems",
        user?.isValid,
        user?.model?.id,
      ]);
      message.success({ content: "Product added to cart" });
    },
    onError: (error: any) => {
      message.error({
        content: error.message,
      });
    },
  });

  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    cartMutation.mutate({
      isOnline: user?.isValid,
      itemID: (productQuery.data as ProductRecord).id!,
      product: productQuery.data as ProductRecord,
      quantity: quantity,
      userId: user?.model?.id,
    });
  };

  if (productQuery.isError) {
    throw new Response(null, {
      status: 404,
      statusText: "This product doesn't exist",
    });
  }

  return (
    <Row className={styles.main} justify='center'>
      <LoadingProducts loading={productQuery.isLoading} />
      {productQuery.isSuccess && (
        <>
          <Col span={20} md={12}>
            <Space align='start' size={"large"}>
              <Image src={productQuery.data?.img}></Image>
              <Space direction='vertical' size={120}>
                <Space direction='vertical'>
                  <Title level={5} ellipsis>
                    {productQuery.data?.name}
                  </Title>
                  <Space>
                    <Title level={2}> EGP {productQuery.data?.price}</Title>
                    <Text type='secondary'>(Now)</Text>
                  </Space>
                  <Text italic type='secondary'>
                    {productQuery.data?.amount} pieces left{" "}
                  </Text>
                </Space>
                <Space align='end'>
                  <InputNumber
                    onChange={(val) => {
                      setQuantity(val);
                    }}
                    defaultValue={1}
                    min={1}
                    max={productQuery.data.amount}
                    size='large'
                  />
                  <Button
                    icon={<ShoppingCartOutlined />}
                    className={styles.cart}
                    size='large'
                    type='primary'
                    onClick={addToCart}
                    loading={cartMutation.isLoading}
                  >
                    Add to cart
                  </Button>
                </Space>
              </Space>
            </Space>
          </Col>

          <Col span={20} md={6}>
            <Card>
              <Space direction='vertical' size={"large"}>
                <Text strong>
                  <Space size={"middle"}>
                    <ReloadOutlined />
                    Free Returns on eligible items
                  </Space>
                </Text>

                <Text strong>
                  <Space size={"middle"}>
                    <CarOutlined />
                    Free shipping
                  </Space>
                </Text>

                <Text strong>
                  <Space size={"middle"}>
                    <LockOutlined />
                    Your data is always protected
                  </Space>
                </Text>
              </Space>
            </Card>
          </Col>
        </>
      )}
    </Row>
  );
};

export default ProductDetails;
