import { useLocation } from "react-router";

export const useProjectIdInUrl = () => {
    const {pathname} = useLocation()
    const id = pathname.match(/projects\/(\d+)/)?.[1]
    return Number(id);
}