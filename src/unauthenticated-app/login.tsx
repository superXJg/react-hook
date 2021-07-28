import { useAuth } from 'context/auth-context';
import { LongButton } from 'unauthenticated-app';
import {Form, Input, Button} from 'antd';
import { useAsync } from 'utils/use-async';

export const LoginScreen = ({onError}: {onError: (error: Error) => void}) => {
  const { login } = useAuth();
  const {isLoading, run} = useAsync(undefined, {throwOnError: true});
  const handleSubmit = (values: {username: string, password: string}) => {
    run(login(values)).catch(onError);
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item  name="username"  rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input placeholder="user" type='text' id='username' />
      </Form.Item>
      <Form.Item  name="password"  rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input placeholder="password" type='text' id='password' />
      </Form.Item>
      <LongButton loading={isLoading} type="primary" htmlType="submit">登录</LongButton>
    </Form>
  );
};
