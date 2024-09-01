import { Form, Input, Button, Select, Space, Modal } from "antd";
import { POSITION_DATASOURCE } from "@/constan";

import "./index.scss";

type FieldType = {
   name: string;
   label: string;
};

interface IProps {
   fieldItems?: FieldType[];
   onCreate: () => void;
}

export default function (props: IProps) {
   const { onCreate } = props;
   return (
      <div className="filter-wrap">
         <div className="item-wrap">
            <Form.Item name="name" label="姓名">
               <Input style={{ width: 200, marginRight: 12 }} placeholder="请输入姓名" />
            </Form.Item>
            <Form.Item name="position" label="位置">
               <Select style={{ width: 200 }} options={POSITION_DATASOURCE} placeholder="请选择" />
            </Form.Item>
         </div>
         <div className="form-btn-group">
            <Form.Item style={{ marginBottom: 0 }}>
               <Space>
                  <Button type="primary" onClick={onCreate}>
                     Creat
                  </Button>
                  <Button type="primary" htmlType="submit">
                     Search
                  </Button>
                  <Button htmlType="reset">Reset</Button>
               </Space>
            </Form.Item>
         </div>
      </div>
   );
}
