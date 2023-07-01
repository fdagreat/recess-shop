import styles from "./styles.module.css";
import { CartItemRecord } from "../../../pocketbase/interfaces/cart";
import { Row, Col, Space, Typography, message } from "antd";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  removeItemFromCart,
  updateItemQuantity,
} from "../../../pocketbase/routes/cart";
import ListItem from "../item";

const { Title, Text } = Typography;

interface propTypes {
  cartItems: CartItemRecord[];
  totalItems: number;
}

const CartItemsList = ({ cartItems, totalItems }: propTypes) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const removeMutation = useMutation(removeItemFromCart);
  const updateMutation = useMutation(updateItemQuantity);

  const handleItemRemove = (id: string | undefined, productID: string) => {
    removeMutation.mutate(
      { itemID: id, isonline: user?.isValid, productID },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([
            "cartItems",
            user?.isValid,
            user?.model?.id,
          ]);
          message.success({ content: "Item removed from cart" });
        },
        onError: (error: any) => {
          message.error(error.message);
        },
      }
    );
  };

  const handleItemUpdate = (
    id: string | undefined,
    productID: string,
    quantity: number
  ) => {
    updateMutation.mutate(
      { itemID: id, quantity, isonline: user?.isValid, productID },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([
            "cartItems",
            user?.isValid,
            user?.model?.id,
          ]);
        },
        onError: (error: any) => {
          message.error(error.message);
        },
      }
    );
  };

  return (
    <Row gutter={[0, 20]}>
      <Col span={24}>
        <Space>
          <Title level={1}>Cart</Title>
          <Text type='secondary'>({totalItems} items)</Text>
        </Space>
      </Col>
      <Col span={24}>
        <Row gutter={[0, 20]}>
          {cartItems.map((item, index) => {
            return (
              <ListItem
                key={index}
                item={item}
                handleItemRemove={handleItemRemove}
                handleItemUpdate={handleItemUpdate}
                isBeingRemoved={
                  removeMutation.isLoading &&
                  removeMutation.variables?.itemID == item.id
                }
              />
            );
          })}
        </Row>
      </Col>
    </Row>
  );
};

export default CartItemsList;
