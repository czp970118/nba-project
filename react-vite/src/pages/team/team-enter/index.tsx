import { useState, useEffect } from "react";
import { Tabs, Form, Select, Input, Button, Pagination, Spin, message } from "antd";
import { TeamItem, TeamCenterKeyEnum, TabKey } from "@/types";
import { getAllTeams } from "@/request/api/team";
import { favoriteTeams } from "@/request/api/user";
import TeamList from "./team-list";
import { PARTTITION_DATA } from "@/constan";
import "./index.scss";
const FormItem = Form.Item;

interface Res {
   success: boolean;
   message: string;
}

const DEFAULT_PAGE_SIZE = 17;
function TeamCenter() {
   const [form] = Form.useForm();
   const [activeKey, setActiveKey] = useState<TabKey>(TeamCenterKeyEnum.ALL);
   const [dataSource, setDataSource] = useState<TeamItem[]>();
   const [current, setCurrent] = useState<number>(1);
   const [total, setTotal] = useState<number>();
   const [spinning, setSpinning] = useState<boolean>(false);

   const onTabChange = (key: string) => {
      setActiveKey(key as TabKey);
   };

   const getTeamList = async (formValues?: any) => {
      const params = {
         pageSize: DEFAULT_PAGE_SIZE,
         pageNum: current,
         isMine: activeKey === TeamCenterKeyEnum.MY,
         ...formValues,
      };
      setSpinning(true);
      const res: any = await getAllTeams(params);
      const { success, data } = res;
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (success) {
         setDataSource(data.list);
         setTotal(data.total);
      } else {
         setDataSource([]);
      }
      setSpinning(false);
   };

   const onSearch = () => {
      const currentFormValues = form.getFieldsValue();
      setCurrent(1);
      getTeamList(currentFormValues);
   };

   const onFavor = async (teamId: number, favor: boolean) => {
      const res: Res = await favoriteTeams({ teamId: String(teamId), favor });
      const { success } = res;
      if (success) {
         message.success(res?.message);
         getTeamList();
      } else {
         message.error(res?.message);
      }
   };

   useEffect(() => {
      getTeamList();
   }, [activeKey, current]);

   return (
      <div className="team-center">
         <Tabs
            className="team-tabs"
            activeKey={activeKey}
            onChange={onTabChange}
            tabBarExtraContent={
               <Form className="team-center-filter" form={form}>
                  <FormItem label="分区" name="partition" style={{ marginRight: 12 }}>
                     <Select
                        style={{ width: 200 }}
                        options={PARTTITION_DATA}
                        placeholder="All"
                        allowClear
                     />
                  </FormItem>
                  <FormItem label="球队名称" name="keywords">
                     <Input
                        placeholder="请输入球队名称"
                        style={{ width: 200 }}
                        onPressEnter={onSearch}
                        allowClear
                     />
                  </FormItem>
                  <FormItem>
                     <Button type="primary" className="search-btn" onClick={onSearch}>
                        Search
                     </Button>
                     <Button
                        onClick={() => {
                           form.resetFields();
                        }}
                     >
                        Reset
                     </Button>
                  </FormItem>
               </Form>
            }
         >
            <Tabs.TabPane key={TeamCenterKeyEnum.ALL} tab="所有球队" />
            <Tabs.TabPane key={TeamCenterKeyEnum.MY} tab="我的球队" />
         </Tabs>
         <Spin spinning={spinning}>
            <TeamList dataSource={dataSource} onFavor={onFavor} />
            <Pagination
               className="team-center-pagination"
               onChange={(page) => {
                  setCurrent(page);
               }}
               total={total}
               current={current}
               pageSize={DEFAULT_PAGE_SIZE}
               showQuickJumper
            />
         </Spin>
      </div>
   );
}

export default TeamCenter;
