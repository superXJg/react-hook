import { useCallback, useEffect } from "react";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import {Project} from '../screen/project-list/index'
export const useProjects = (param?: Partial<Project>) => {
    const request = useHttp()
    const {run, ...result}= useAsync<Project[]>()
    const fetchProjects = useCallback(() => request('projects', {data: param}), [param, request])
    useEffect(() => {
        run(fetchProjects(), {
            retry: fetchProjects
        })
    }, [param, run, fetchProjects])
    return result
}

export const useEditProject = () => {
    const {run, ...asyncResult} = useAsync();
    const client = useHttp();
    const mutate = (params: Partial<Project>) => {
        return run(client(`projects/${params.id}`, {
            data: params,
            method: 'PATCH'
        }))
    }
    return {
        mutate,
        ...asyncResult
    }
}

export const useAddProject = () => {
    const {run, ...asyncResult} = useAsync();
    const client = useHttp();
    const mutate = (params: Partial<Project>) => {
        run(client(`projects/${params.id}`, {
            data: params,
            method: 'POST'
        }))
    }
    return {
        mutate,
        ...asyncResult
    }
}