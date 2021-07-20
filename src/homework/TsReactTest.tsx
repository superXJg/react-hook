import { func } from "prop-types";
import React, { useEffect, useState } from "react";

function useArr<T>(props: T[]) {
    const [value, setValue] = useState(props)
    return {
        value,
        setValue,
        add: (item: T) => setValue([...value, item]),
        clear: () => setValue([]),
        removeIndex: (index: number) => {
            const copy = [...value];
            copy.splice(index, 1);
            setValue(copy);
        }
    }
}
export const TsTest = () => {
    interface Person {
        name: string, age: number
    }
    const person: Person[] = [
        {name: 'xxx', age: 19}
    ]
    const {value, add, clear, removeIndex} = useArr(person);
    
    useEffect(() => {
        console.log(value);
        add({name: 'jjj', age: 20});
        removeIndex(0);
    }, [])
}