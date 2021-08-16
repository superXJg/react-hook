import { useMemo } from "react";
import { useSearchParams, URLSearchParamsInit } from "react-router-dom";
import { cleanObject } from "utils";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams] = useSearchParams();
    const setSearchParams = useSetUrlSearchParam();
    const result = keys.reduce((prev: {}, key:K) => {
        return {...prev, [key]: searchParams.get(key) || ''}
    }, {}) as {[key in K] : any};
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const resultMemo = useMemo(() => result, [searchParams]);
    return [
        resultMemo,
        (params: Partial<{ [key in K]: unknown }>) => {
            return setSearchParams(params);
            // iterator
            // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
        }
    ] as const
}
export const useSetUrlSearchParam = () => {
    const [searchParams, setSearchParam] = useSearchParams();
    return (params: { [key in string]: unknown }) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParam(o);
    };
  };