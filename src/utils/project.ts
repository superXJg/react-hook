import { useCallback, useEffect } from "react";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import {Project} from '../screen/project-list/index'
import { useMutation, useQuery, useQueryClient } from "react-query";
export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()
    // const {run, ...result}= useAsync<Project[]>()
    // const fetchProjects = useCallback(() => request('projects', {data: param}), [param, request])
    // useEffect(() => {
    //     run(fetchProjects(), {
    //         retry: fetchProjects
    //     })
    // }, [param, run, fetchProjects])
    // return result
    return useQuery<Project[], Error>(['projects', param], () => client('projects', {data: param}))
}

export const useEditProject = () => {
    const client = useHttp();
    const queryClient = useQueryClient();
    return useMutation((parmas: Partial<Project>) => client(`projects/${parmas.id}`, {
        method: 'PATCH',
        data: parmas
    }),
    {
        onSuccess: () => queryClient.invalidateQueries('projects')
    }
    )
    // const {run, ...asyncResult} = useAsync();
    // const mutate = (params: Partial<Project>) => {
    //     return run(client(`projects/${params.id}`, {
    //         data: params,
    //         method: 'PATCH'
    //     }))
    // }
    // return {
    //     mutate,
    //     ...asyncResult
    // }
}

export const useAddProject = () => {
    const client = useHttp();
    const queryClient = useQueryClient();
    return useMutation((parmas: Partial<Project>) => client(`projects/${parmas.id}`, {
        method: 'POST',
        data: parmas
    }),
    {
        onSuccess: () => queryClient.invalidateQueries('projects')
    }
    )
    // const {run, ...asyncResult} = useAsync();
    // const mutate = (params: Partial<Project>) => {
    //     run(client(`projects/${params.id}`, {
    //         data: params,
    //         method: 'POST'
    //     }))
    // }
    // return {
    //     mutate,
    //     ...asyncResult
    // }
}
export const useProject = (id?: number) => {
    const client = useHttp();
    return useQuery<Project>(
      ["project", { id }],
      () => client(`projects/${id}`),
      {
        enabled: Boolean(id),
      }
    );
  };