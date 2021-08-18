import React from 'react';
import {Raw} from 'types';
import {Select} from 'antd';

type SelectProps = React.ComponentProps<typeof Select>
interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
    value?: Raw | null | undefined,
    onChange?: (value?: number) => void,
    defaultOptionName?: string,
    options?: {name: string, id: number}[]
}
/**
 * value 可以传入多种类型
 * onChange 回调number | undefined 类型
 * 当isNaN(Number(value)) 为true的时候 代表选择默认类型
 * 当选择默认类型的时候 onChange会回调undefined
 * @param props 
 */

export const IdSelect = (props: IdSelectProps) => {
    const { value, onChange, defaultOptionName, options, ...restProps} = props;
    return <Select
        value={toNumber(value)}
        {...restProps}
        onChange={
            value => onChange?.(toNumber(value) || undefined)
        }
    >
        {
            defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
        }
        {
            options?.map((v) => <Select.Option key={v.id} value={v.id}>{v.name}</Select.Option>)
        }
    </Select>
}
const toNumber = (value: unknown) => {
    return isNaN(Number(value)) ? 0 : Number(value)
}