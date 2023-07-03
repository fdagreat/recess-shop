import styles from "./styles.module.css";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../../pocketbase/routes/cart";
import { Typography, Row, Col } from "antd";

import LoadingProducts from "../../components/Products/Loading";
import Invoice from "../../components/cart/invoice";
import CartItemsList from "../../components/cart/item list";
import EmptyCart from "../../components/cart/empty";

const CartPage = () => {
  const { user } = useAuth();
  const { data, isLoading } = useQuery(
    ["cartItems", user?.isValid, user?.model?.id],
    getCartItems
  );

  return (
    <Row className={styles.main} justify={"center"}>
      <LoadingProducts loading={isLoading} />
      {data?.cartItems.length == 0 && <EmptyCart />}
      {data && data?.cartItems.length > 0 && (
        <>
          <Col span={22} md={14} className={styles.list}>
            <CartItemsList
              cartItems={data.cartItems}
              totalItems={data.totalItems}
            />
          </Col>
          <Col span={22} md={8}>
            <Invoice
              totalInvoice={data.totalInvoice}
              totalItems={data.totalItems}
              user={user?.model?.id ? user.model : null}
              cartItems={data.cartItems}
            />
          </Col>
        </>
      )}
    </Row>
  );
};

export default CartPage;
