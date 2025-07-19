import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Text Constants
const TEXT = {
  LOGIN_FAILED: "Login failed, please try again.",
  LOGIN_SUCCESS: "Login successful, redirecting...",
  LOGIN_BUTTON_TEXT: "Login",
};

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handelLogin = async (values: any) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://localhost:7154/api/Auth/login",
        values
      );
      localStorage.setItem("token", res.data.result);
      navigate("/Students");
    } catch (error) {
      message.error(TEXT.LOGIN_FAILED);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="login"
      onFinish={handelLogin}
      layout="vertical"
      style={{ maxWidth: 400, marginTop: 100 }}
    >
      <Form.Item
        label="Email"
        name="Email"
        rules={[{ required: true, message: "Please input your Email!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input type="password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" loading={loading} htmlType="submit" block>
          {TEXT.LOGIN_BUTTON_TEXT}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Login;
