import React, { useState } from "react";
import { useAuth } from 'context/auth-context';
import { ProjectList } from 'screen/project-list'
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "./asset/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { Navigate, Route, Routes } from "react-router";
import {BrowserRouter as Router} from 'react-router-dom';
import { ProjectScreen } from "screen/project-screen";
import { resetRoute } from "utils";
import { ProjectModal } from 'screen/project-list/project-modal'
import { ProjectPopover } from "components/project-popover";
import { useProjectModal } from "screen/project-list/util";
export const Authenticated = () => {
    const [projectModalOpen, setProjectModalOpen] = useState(false)
    return <Container>
        <Router>
            <PageHeader/>
            <Main>
                <Routes>
                    <Route path={"/projects"} element={<ProjectList />} />
                    <Route path={"/projects/:projectId/*"} element={<ProjectScreen />} />
                    <Navigate to={"/projects"} />
                </Routes>
            </Main>
            <ProjectModal />
        </Router>
    </Container>
}
const PageHeader = () => {
    const { logout, user } = useAuth();
    return <Header between={true}>
    <HeaderLeft gap={true}>
    <Button type='link' onClick={resetRoute}>
        <SoftwareLogo  width={'18rem'} color={'rgb(38,132,255)'}/>
    </Button>
        <ProjectPopover />
        <h3>用户</h3>
    </HeaderLeft>
    <HeaderRight>
        <Dropdown overlay={
            <Menu>
                <Menu.Item key={'logout'}>
                    <Button onClick={logout} type='link'>登出</Button>
                </Menu.Item>
            </Menu>
        }>
            <Button type='link' onClick={(e) => e.preventDefault()}>
                Hi , {user?.name}
            </Button>
        </Dropdown>
    </HeaderRight>
</Header>
}

const Container = styled.div`
height: 100vh;
`
const Header = styled(Row)`
padding: 3.2rem;
box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
z-index: 1
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.main`
height: calc(100vh - 6rem)
`