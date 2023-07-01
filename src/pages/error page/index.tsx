import { useRouteError } from "react-router-dom";
import styles from "./error.module.css";
import { Row, Layout, Result, Button } from "antd";
import { Link } from "react-router-dom";

const { Content } = Layout;

export default function ErrorPage() {
  const error: any = useRouteError();

  return (
    <Layout>
      <Content>
        <Row
          align='middle'
          justify={"center"}
          wrap
          className={styles.errorpage}
        >
          <Result
            status={error.status ?? "error"}
            title={error.statusText || error.message}
            subTitle='Sorry, an unexpected error has occurred.'
            extra={
              <Link reloadDocument to='/'>
                <Button type='primary'>Back Home</Button>
              </Link>
            }
          />
        </Row>
      </Content>
    </Layout>
  );
}
