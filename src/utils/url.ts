import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParam] = useSearchParams();
    const result = keys.reduce((prev: {}, key:K) => {
        return {...prev, [key]: searchParams.get(key) || ''}
    }, {} as {[key in K] : string});

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const resultMemo = useMemo(() => result, [searchParams]);
    return [
        resultMemo,
        setSearchParam
    ] as const
}
