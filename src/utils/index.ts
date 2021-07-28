import { useEffect, useRef, useState } from "react";

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
// 后面用泛型来规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      // 每次在value变化以后，设置一个定时器
      console.log('Timeout')
      const timeout = setTimeout(() => {
        console.log('Timeout inner')
        setDebouncedValue(value)
      }, delay);
      // 每次在上一个useEffect处理完以后再运行
      return () => {
        console.log('clearTimeout')
        clearTimeout(timeout)
      };
    }, [value, delay]);
  
    return debouncedValue;
  };

  export const useMount = (callback: () => void) => {
    useEffect(() => {
      callback()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  }

  export const resetRoute = () => window.location.href = window.location.origin;

  export const cleanObject = (object?: { [key: string]: unknown }) => {
    // Object.assign({}, object)
    if (!object) {
      return {};
    }
    const result = { ...object };
    Object.keys(result).forEach((key) => {
      const value = result[key];
      if (isVoid(value)) {
        delete result[key];
      }
    });
    return result;
  };

  export const useMountedRef = () => {
    const mountedRef = useRef(false);
  
    useEffect(() => {
      mountedRef.current = true;
      return () => {
        mountedRef.current = false;
      };
    });
  
    return mountedRef;
  };