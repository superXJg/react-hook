import { Button, Card, Divider, Typography } from "antd";
import { useState } from "react"
import { LoginScreen } from './login';
import { RegisterScreen } from './register';
import styled from '@emotion/styled';
import logo from 'asset/logo.svg';
import left from 'asset/left.svg';
import right from 'asset/right.svg';
import { ErrorBox } from "components/lib";
export const Unauthenticated = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState<Error | null>(null)
    return <Container>
        <Header />
        <Background />
        <ShadowCard>
            <Title>
            {isRegister ? '请注册' : '请登录'}        
            </Title>
            <ErrorBox error={error} />
            {/* {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null} */}
            {isRegister ? <RegisterScreen onError={setError}/> : <LoginScreen onError={setError} />}
            <Divider />
            <a onClick={() => setIsRegister(!isRegister)}>切换到{isRegister ? '已经有账号了登录': '没有账号？注册新账号'}</a>
        </ShadowCard>
    </Container>
}
export const LongButton = styled(Button)`
  width: 100%;
`;
const Title = styled.h2`
margin-bottom: 2.4rem;
color: rgb(94,108,132)
`
const Background = styled.div`
position: absolute;
width: 100%;
height: 100%;
background-repeat: no-repeat;
background-attachment: fixed;
background-position: left bottom, right bottom;
background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
calc(((100vw - 40rem) / 2) - 3.2rem), cover;
background-image: url(${left}), url(${right});
`
const Header = styled.header`
background: url(${logo}) no-repeat center;
padding: 5rem 0;
background-size: 8rem;
width: 100%;
`
const ShadowCard = styled(Card)`
width: 40rem;
min-height: 56rem;
padding: 3.2rem 4rem;
border-radius: 0.3rem;
box-sizing: border-box;
box-shadow:rgba(0,0,0,0.1) 0 0 10px;
text-align: center;
margin: auto;
`
const Container = styled.div`
/* display: flex; */
justify-content: center;
align-items: center;
height: 100vh;

`