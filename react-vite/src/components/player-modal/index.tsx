import React, { useState, useEffect } from "react";
import { Form, Modal, Input, Select, InputNumber, Radio } from "antd";
import UploadImage from "@/components/upload";
import { POSITION_DATASOURCE } from "@/constan";
import { ModalMode } from "@/types";
import { ModalModeEnum } from "@/enum";

import "./index.scss";

interface IProps {
   open: boolean;
   onClose: () => void;
   onOk: (values: any) => void;
   initValues?: any;
   mode: ModalMode;
}

const formLayout = {
   labelCol: { span: 4 },
};

const PlayerModal = (props: IProps) => {
   const { open, onClose, onOk, initValues, mode } = props;
   const [form] = Form.useForm();
   const onSubmit = async () => {
      form
         .validateFields()
         .then((values) => {
            const params = values;
            if (mode === ModalModeEnum.EDIT) {
               params.id = initValues.id;
            }
            onOk(params);
         })
         .catch((err) => {
            console.log("err", err);
         });
   };

   useEffect(() => {
      form.setFieldsValue({ ...initValues, activService: true });
   }, [initValues]);

   return (
      <Modal
         title={mode === ModalModeEnum.CREATE ? "创建球员" : "编辑球员"}
         open={open}
         onCancel={onClose}
         onOk={onSubmit}
         destroyOnClose={true}
      >
         <Form form={form} className="create-form" preserve={false} {...formLayout}>
            <Form.Item name="avatar" className="avatar-item">
               <UploadImage
                  onChange={(url: string) => {
                     form.setFieldValue("avatar", url);
                  }}
               />
            </Form.Item>
            <Form.Item name="name" label="姓名" rules={[{ required: true, message: "请输入姓名" }]}>
               <Input placeholder="请输入" style={{ width: 300 }} />
            </Form.Item>
            <Form.Item
               name="position"
               label="位置"
               rules={[{ required: true, message: "请至少选择一个位置" }]}
            >
               <Select options={POSITION_DATASOURCE} mode="tags" style={{ width: 300 }} />
            </Form.Item>
            <Form.Item
               name="number"
               label="号码"
               rules={[{ required: true, message: "请输入号码" }]}
            >
               <InputNumber min={0} style={{ width: 150 }} />
            </Form.Item>
            <Form.Item name="age" label="年龄">
               <InputNumber min={1} style={{ width: 150 }} />
            </Form.Item>
            <Form.Item name="activService" label="现役球员">
               <Radio.Group>
                  <Radio value={true}>是</Radio>
                  <Radio value={false}>否</Radio>
               </Radio.Group>
            </Form.Item>
            <Form.Item name="capability" label="能力值">
               <InputNumber min={1} style={{ width: 150 }} />
            </Form.Item>
            <Form.Item name="introduction" label="介绍">
               <Input.TextArea rows={4} />
            </Form.Item>
         </Form>
      </Modal>
   );
};

export default PlayerModal;
