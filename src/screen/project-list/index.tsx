import { useEffect, useState } from 'react'
import {List} from './list'
import {SearchPanel} from './search'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'
import { useProjects } from 'utils/project'
import { useDebounce } from "utils";
import { useUser } from 'utils/user'
import { useUrlQueryParam } from 'utils/url'
import { Button, Row } from 'antd'
import { useAsync } from 'utils/use-async'
import { useProjectModal } from './util'
export interface Project {
    id: any,
    name: string,
    personId: string,
    pin: boolean,
    organization: string
}
export const ProjectList = () => {
    // const [, setParams] = useState({
    //     name: '',
    //     personId: ''
    // });
    const {open} = useProjectModal()
    const [param, setParams] = useUrlQueryParam(['name', 'personId'])
    const debounceParam = useDebounce(param, 200);
    const {isLoading, data: list}= useProjects(debounceParam);
    const {data: users} = useUser();

    return <Container>
        {/* <Button onClick={retry}>retry</Button> */}
        <Row justify='space-between'>
        <h1>项目列表</h1>
        <Button type='link' onClick={open}>创建项目</Button>
        </Row>
        
        <SearchPanel param={param} users={users || []} setParams={setParams} />
        <List loading={isLoading} users={users || []} dataSource={list || []}></List>
    </Container>
}

ProjectList.whyDiyYouRender = true;
const Container = styled.div`
padding: 3.2rem
`

