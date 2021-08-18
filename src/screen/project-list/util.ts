import { stringify } from 'qs';
import { useMemo } from 'react';
import { useProject } from 'utils/project';
import {useSetUrlSearchParam, useUrlQueryParam} from 'utils/url'// 项目列表搜索的参数

export const useProjectsSearchParams = () => {
  interface Temp {
      name: string,
      personId:string
  }
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  const temp: Partial<Temp> = {...param};
  return [
    useMemo(
      () => ({ ...param, personId: Number(temp.personId) || undefined }),
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
  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setProjectCreate({  projectCreate: false });
  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );
  return {
    projectModalOpen: projectCreate === "true",
    open,
    close,
    isLoading,
    editingProject
  }
};