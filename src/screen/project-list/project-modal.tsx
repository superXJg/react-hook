import React, { useEffect } from 'react';
import {Button, Drawer, Form, Spin} from 'antd';
import { useProjectModal } from './util';
import { UserSelect } from 'components/user-select';
import { useAddProject, useEditProject } from 'utils/project';

export const ProjectModal = () => {
    const {projectModalOpen, close, isLoading, editingProject} = useProjectModal();
    const useMutateProject = editingProject ? useEditProject: useAddProject;
    const {mutateAsync, error, isLoading: mutateLoading} = useMutateProject();
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        mutateAsync({...editingProject, ...values}).then(() => {
            form.resetFields();
            close();
        })
    }
    const closeModal = () => {
        form.resetFields();
        close();
    };
    useEffect(() => {
        form.setFieldsValue(editingProject);
    }, [editingProject, form]);
    const title = editingProject ? "编辑项目" : "创建项目";
    return <Drawer visible={projectModalOpen} onClose={closeModal} width={'100%'}>
        {
            isLoading ? <Spin size={'large'} /> : <>
                <h1>{title}</h1>
                <Form layout={'vertical'} style={{width: '40rem'}} onFinish={onFinish}>
                    <Form.Item label="名称" name={'name'} rules={[
                        {required: true,
                        message: '请输入项目名称'}
                    ]}>
                        <input type="text" />
                    </Form.Item>
                    <Form.Item label="部门" name={'organization'} rules={[
                        {required: true,
                        message: '请输入部门名称'}
                    ]}>
                        <input type="text" />
                    </Form.Item>
                    <Form.Item label="负责人" name={'personId'} rules={[
                        {
                        message: '请输入部门名称'}
                    ]}>
                        <UserSelect defaultOptionName='负责人' />
                    </Form.Item>
                    <Form.Item label="负责人" name={'personId'} rules={[
                        {
                        message: '请输入部门名称'}
                    ]}>
                        <Button loading={mutateLoading} htmlType='submit' type="primary">提交</Button>
                    </Form.Item>
                </Form>
            </>
        }
        <h1>Project Modal</h1>
        <Button onClick={close}></Button>
    </Drawer>
}