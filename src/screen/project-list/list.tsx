import { Dropdown, Menu, Table, TableProps } from "antd"
import dayjs from "dayjs";
import { User } from "./search";
import {Link} from 'react-router-dom';
import {Pin} from 'components/pin'
import { render } from "@testing-library/react";
import { useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal } from "./util";
import { Project } from "../../types/project";
interface ListProps extends TableProps<Project> {
  users: User[]
}
export const List = ({users, ...props}: ListProps) => {
    const {open} = useProjectModal();
    const {mutate} = useEditProject();
    const pinProject = (id: string) => (pin: boolean) => mutate({id, pin})
    const columns = [
      {
        title: <Pin checked={true} disabled={true} />,
        render(value:string, project: Project) {
          return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)
          } />
        }
      },
      {
        title: '姓名',
        key: 'name',
        render(value:string, project: Project) {
          return <Link to={String(project.id)}>{project.name}</Link>
        }
      },
      {
        title: '归类',
        dataIndex: 'organization',
        key: 'organization',
      },
      {
        title: '创建时间',
        dataIndex: 'created',
        key: 'created',
        render: (text: number) => text ? dayjs(text).format('YYYY-MM-DD') : 'NULL'
      },
      {
        title: '操作',
        render: () => <Dropdown overlay={
          <Menu>
            <Menu.Item key='edit'>
              <ButtonNoPadding onClick={open} type='link'>编辑</ButtonNoPadding>
            </Menu.Item>
          </Menu>
        }>
          <ButtonNoPadding type='link'>...</ButtonNoPadding>
        </Dropdown>
      }
    ];
    return <Table {...props} columns={columns} pagination={false}>
    </Table>
}