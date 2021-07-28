import { useAuth } from "context/auth-context";
import {Form, Input} from 'antd';
import { LongButton } from 'unauthenticated-app';
import { useAsync } from "utils/use-async";

export const RegisterScreen = ({onError}: {onError: (error: Error) => void}) => {
  const { register } = useAuth();
  const {isLoading, run} = useAsync(undefined, {throwOnError: true});
  const handleSubmit = (values: {username: string, password: string, cpassword: string}) => {
    if (values.cpassword !== values.password) {
      onError(new Error('请确认两次输入密码相同'));
      return
    }
    run(register(values)).catch(onError);
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item  name="username"  rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input placeholder="username" type='text' id='username' />
      </Form.Item>
      <Form.Item  name="password"  rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input placeholder="password" type='text' id='password' />
      </Form.Item>
      <Form.Item name="cpassword"  rules={[{ required: true, message: 'Please input your cpassword!' }]}>
        <Input placeholder="cpassword" type='text' id='password' />
      </Form.Item>
      <LongButton loading={isLoading} type="primary" htmlType="submit">注册</LongButton>
    </Form>
  );
};