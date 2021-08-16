import { stringify } from 'qs';
import { useMemo } from 'react';
import {useUrlQueryParam} from 'utils/url'// 项目列表搜索的参数

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

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setProjectCreate({  projectCreate: false });

  return {
    projectModalOpen: projectCreate === "true",
    open,
    close
  }
};