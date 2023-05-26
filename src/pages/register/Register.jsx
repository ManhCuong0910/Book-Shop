import { Button, Form, Input, notification } from "antd";
import { callRegister } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const timeoutRef = useRef(null);

  const onFinish = async (values) => {
    setIsLoading(true)
    try {
      const result = await callRegister(values.fullname, values.email, values.password, values.phone)
      setIsLoading(false)
      openNotificationSuccess("top");
      timeoutRef.current = setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      openNotificationFalse("topRight");
    }
  };
  const openNotificationSuccess = (placement) => {
    api.info({
      message: `Đăng ký thành công`,
      icon: <CheckCircleFilled style={{ color: "green" }} />,
      placement,
    });
  };
  
  const openNotificationFalse = (placement) => {
    api.info({
      message: `Đăng ký thất bại`,
      icon: <CloseCircleFilled style={{ color: "red" }} />,
      description:
        "Đã xảy ra lỗi, email đã tồn tại vui lòng kiểm tra lại",
      placement,
    });
  };
  useEffect(() => {
    clearTimeout(timeoutRef.current);
  }, []);

  return (
    <>
{contextHolder}
    <Form
      name="basic"
      style={{
        maxWidth: 400,
        margin: "0 auto",
      }}
      onFinish={onFinish}
      autoComplete="off"
    >

      <h1 style={{ textAlign: "center" }}>Đăng Kí</h1>
      <Form.Item
        labelCol={{
          span: 24,
        }}
        label="Full Name"
        name="fullname"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        labelCol={{
          span: 24,
        }}
        rules={[
          {
            pattern: new RegExp(
              // eslint-disable-next-line no-useless-escape
              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            ),
            message: "Enter a valid email address!",
          },
          {
            required: true,
            message: "Please input your email",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        labelCol={{
          span: 24,
        }}
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        labelCol={{
          span: 24,
        }}
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item style={{ textAlign: "center" }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>
  );
}
