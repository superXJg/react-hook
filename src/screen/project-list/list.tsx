import { Dropdown, Menu, Modal, Table, TableProps } from "antd"
import dayjs from "dayjs";
import { User } from "./search";
import {Link} from 'react-router-dom';
import {Pin} from 'components/pin'
import { render } from "@testing-library/react";
import { useDeleteProject, useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal } from "./util";
import { Project } from "../../types/project";
interface ListProps extends TableProps<Project> {
  users: User[]
}
export const List = ({users, ...props}: ListProps) => {
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
        render:(value:string, project: Project) => {
          return <More project={project} />;
        },
      }
    ];
    const More = ({project}: {project: Project}) => {
      const { startEdit } = useProjectModal();
      const editProject = (id: number) => startEdit(id);
      const { mutate: deleteProject } = useDeleteProject();
      const confirmDeleteProject = (id: number) => {
        Modal.confirm({
          title: "确定删除这个项目吗?",
          content: "点击确定删除",
          okText: "确定",
          onOk() {
            deleteProject({ id });
          },
        });
      };
      return (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={() => editProject(project.id)} key={"edit"}>
                编辑
              </Menu.Item>
              <Menu.Item
                onClick={() => confirmDeleteProject(project.id)}
                key={"delete"}
              >
                删除
              </Menu.Item>
            </Menu>
          }
        >
          <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
        </Dropdown>
      );
    }
    return <Table rowKey={"id"} {...props} columns={columns} pagination={false}>
    </Table>

    
}