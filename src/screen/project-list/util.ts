import { stringify } from 'qs';
import { useCallback, useMemo } from 'react';
import { useProject } from 'utils/project';
import {useSetUrlSearchParam, useUrlQueryParam} from 'utils/url'// 项目列表搜索的参数

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const setUrlParams = useSetUrlSearchParam();
  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );
  // const editingProject = {
  //   created: '1604989757139',
  //   id: 1,
  //   name: "快递管理",
  //   organization: "快递组",
  //   ownerId: 2088053510,
  //   personId: 4,
  //   pin: true
  // }
  
  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" });
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};