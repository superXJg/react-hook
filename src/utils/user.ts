import { useEffect } from "react";
import { User } from "screen/project-list/search";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUser = (param?: Partial<User>) => {
    const client = useHttp();
    const {run, ...result} = useAsync<User[]>();
    useEffect(() => {
        run(client('users'))
    }, []);
    return result
}