import React from 'react'
import { Button, Divider, List, Popover, Typography } from 'antd'
import { useProjects } from 'utils/project';
import styled from '@emotion/styled';
import { useProjectModal } from 'screen/project-list/util';

export const ProjectPopover = (() => {
    const {data: projects, isLoading} = useProjects();
    const {open} = useProjectModal()
    const pinnedProjects = projects?.filter(project => project.pin)
    const content = <Container>
        <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
        <List>
            {
                pinnedProjects?.map(project => <List.Item>
                    <List.Item.Meta title={project.name}></List.Item.Meta>
                </List.Item>)
            }
        </List>
        <Divider></Divider>
        <Button onClick={open} type={'link'}>创建项目</Button>
    </Container>
    return <Popover placement={'bottom'} content={content}>
    </Popover>
})

const Container = styled.div`
width: 32rem
`
