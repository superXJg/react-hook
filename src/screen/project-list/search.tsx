import { Input, Select, Form } from 'antd';
import { UserSelect } from 'components/user-select';
export interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
    created: number;
  }
  
export interface User {
    id: number;
    name: string;
    email: string;
    title: string;
    organization: string;
    token: string;
  }
interface SearchPanelProps {
    users: User[];
    param: any;
    setParams: (param: SearchPanelProps["param"]) => void;
}  

export const SearchPanel = ({param, users, setParams}: SearchPanelProps) => {
    const handleInput = (e: any) => {
        setParams({
            ...param,
            name: e.target.value
        })
    }
    return <Form layout={'inline'}>
        <Form.Item>
            <Input value={param.name} onChange={handleInput}></Input>
        </Form.Item>
        <Form.Item>
            <UserSelect
                defaultOptionName={"负责人"}
                value={param.personId}
                onChange={(value) =>
                    setParams({
                      ...param,
                      personId: value,
                    })
                  }
            ></UserSelect>
        </Form.Item>
        
    </Form>
    
    
}