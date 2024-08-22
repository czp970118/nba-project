import { useEffect } from "react";
import { Modal, Form, Input, TreeSelect, Select } from "antd";
import { AMERICA_CITY_DATA, PARTTITION_DATA } from "@/constan";
import UploadImage from "@/components/upload";

import "./index.scss";

interface IProps {
   open: boolean;
   onClose: () => void;
   values: any;
   onSubmit: (value: any) => void;
}

const formLayout = {
   labelCol: { span: 4 },
   wrapperCol: { span: 20 },
};

export default (props: IProps) => {
   const { open, onClose, values, onSubmit } = props;
   const [form] = Form.useForm();
   const formValus = form.getFieldsValue();

   useEffect(() => {
      if (open && values) {
         form.setFieldsValue(values);
      }
   }, [form, open, values]);

   const onOk = async () => {
      form.validateFields().then((res) => {
         onSubmit(res);
      });
   };

   return (
      <Modal open={open} onCancel={onClose} title="球队编辑" onOk={onOk}>
         <Form {...formLayout} form={form}>
            <div className="edit-team-logo">
               <Form.Item noStyle name="logo">
                  <UploadImage value={formValus?.logo} />
               </Form.Item>
            </div>
            <Form.Item
               label="球队名称"
               name="teamName"
               rules={[{ required: true, message: "请输入球队名称" }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label="主教练"
               name="manager"
               rules={[{ required: true, message: "请输入主教练" }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label="主场球馆"
               name="homeArena"
               rules={[{ required: true, message: "请输入主场球馆" }]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               label="所在城市"
               name="city"
               rules={[{ required: true, message: "请选择所在城市" }]}
            >
               <TreeSelect treeData={AMERICA_CITY_DATA} />
            </Form.Item>
            <Form.Item
               label="所在分区"
               name="partition"
               rules={[{ required: true, message: "请选择所在分区" }]}
            >
               <Select options={PARTTITION_DATA} />
            </Form.Item>
         </Form>
      </Modal>
   );
};
