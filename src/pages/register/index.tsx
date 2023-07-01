import styles from "./styles.module.css";
import coverImg from "../../assets/shopping wallpaper.jpg";
import { Link } from "react-router-dom";
import { loginWithPassword, registerWithPassword } from "../../pocketbase/auth";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import {
  Layout,
  Row,
  Col,
  Typography,
  Button,
  Form,
  Input,
  message,
} from "antd";

import { useMutation } from "@tanstack/react-query";

const { Content } = Layout;
const { Title } = Typography;

const Register = () => {
  const register = async ({ name, email, password }: any) => {
    await registerWithPassword({ name, email, password });
    await loginWithPassword({ email, password });
  };

  const registerMutation = useMutation(register, {
    onError: (error: any) => {
      message.error({
        content: error.message,
      });
    },
  });

  const handleSumbit = (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    registerMutation.mutate(values);
  };

  return (
    <Layout>
      <Content className={styles.container}>
        <Row className={styles.main} justify='center' align='middle'>
          <Col span={0} md={12}>
            <img className={styles.coverConatiner} src={coverImg}></img>
          </Col>
          <Col span={24} md={12}>
            <Row justify={"center"} align={"middle"} gutter={[0, 30]}>
              <Col span={24}>
                <Row justify={"center"}>
                  <Title level={3}>Sign up to Recess</Title>
                </Row>
              </Col>
              <Col span={24}>
                <Row justify={"center"}>
                  <Form
                    name='login'
                    className={styles.loginform}
                    initialValues={{ remember: true }}
                    onFinish={handleSumbit}
                  >
                    <Form.Item
                      name='name'
                      rules={[
                        {
                          required: true,
                          message: "Please input your name!",
                        },
                      ]}
                    >
                      <Input
                        prefix={<UserOutlined />}
                        placeholder='Your name'
                      />
                    </Form.Item>
                    <Form.Item
                      name='email'
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                          type: "email",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <MailOutlined className='site-form-item-icon' />
                        }
                        placeholder='Email'
                      />
                    </Form.Item>
                    <Form.Item
                      name='password'
                      rules={[
                        {
                          required: true,
                          message: "Please input your Password!",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <LockOutlined className='site-form-item-icon' />
                        }
                        type='password'
                        placeholder='Password'
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type='primary'
                        htmlType='submit'
                        className='login-form-button'
                        loading={registerMutation.isLoading}
                      >
                        Register
                      </Button>
                    </Form.Item>
                    Already have an account?{" "}
                    <Link to={"/auth/login"}>Login</Link>
                  </Form>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Register;
