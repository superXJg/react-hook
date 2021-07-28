import { useState, useCallback } from "react"
import {useMountedRef} from './index'

interface State<D> {
    error: Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}

const defaultConfig = {
    throwOnError: false
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = {...defaultConfig, ...initialConfig}
    const [state, setState] = useState({
        ...defaultInitialState,
        ...initialState
    })
    const [retry, setRetry] = useState(() => () => {})
    const mountedRef = useMountedRef()
    const setData = useCallback((data: D) => setState({
        data,
        stat: 'success',
        error: null
    }), [])

    const setError = useCallback((error: Error) => setState({
        error,
        stat: 'error',
        data: null
    }), [])

    const run = useCallback((promise: Promise<D>, runConfig?: {retry: () => Promise<D>}) => {
        if (!promise || !promise.then) {
            throw Error('xxxxx')
        }
        setRetry(() => () => {
            if (runConfig?.retry) {
                run(runConfig?.retry(), runConfig)
            }
        })
        setState(prevState => ({...prevState, stat: 'loading'}));
        return promise.then(data => {
            if (mountedRef?.current) {
                setData(data);
                return data;
            }
        }).catch(error => {
            setError(error);
            if (config.throwOnError) return Promise.reject(error)
            return error
        })
    }, [config.throwOnError, mountedRef, setData, setError])
    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        retry,
        setData,
        setError,
        ...state
    }
}