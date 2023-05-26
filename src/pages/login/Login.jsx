import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { callLogin } from "../../services/api";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlice";
export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const timeoutRef = useRef(null);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const res = await callLogin(values.username, values.password, 1000);
      setIsLoading(false);
      localStorage.setItem("Access_Token", res.data.data.access_token)
      openNotificationSuccess("top");
      dispatch(doLoginAction(res.data.data.user))
      timeoutRef.current = setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
      openNotificationFalse("topRight");
    }
  };

  const openNotificationSuccess = (placement) => {
    api.info({
      message: `Đăng nhập thành công`,
      icon: <CheckCircleFilled style={{ color: "green" }} />,
      placement,
    });
  };

  const openNotificationFalse = (placement) => {
    api.info({
      message: `Đăng nhập thất bại`,
      icon: <CloseCircleFilled style={{ color: "red" }} />,
      description:
        "Đã xảy ra lỗi, Vui lòng kiểm tra lại Username hoặc Password",
      placement,
    });
  };

  useEffect(() => {
    clearTimeout(timeoutRef.current);
  }, []);

  return (
    <>
      {contextHolder}
      <h1 style={{ textAlign: "center" }}>Đăng Nhập</h1>
    
      <div style={{ display: "flex", justifyContent: "center"}}>
      <Link to="/register" style={{ textAlign: "center" }}>
        Bạn chưa có tài khoản ? Click để đăng kí
      </Link>
    </div>
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        style={{
          maxWidth: 400,
          margin: "0 auto",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          labelCol={{ span: 24 }}
          name="username"
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
          labelCol={{ span: 24 }}
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
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
