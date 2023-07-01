import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import NavMenu from "../components/Layout/NavMenu";
import PageFooter from "../components/Layout/Footer";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { transferLocalCart } from "../pocketbase/routes/cart";

const { Header, Footer, Content } = Layout;

const Root = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user?.isValid) {
      transferLocalCart(user?.model?.id!);
    }
  }, [user?.isValid]);

  return (
    <Layout id='layout'>
      <Header id='header'>
        <NavMenu />
      </Header>
      <Layout hasSider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
      <Footer>
        <PageFooter />
      </Footer>
    </Layout>
  );
};

export default Root;
