import { useEffect, useState } from "react";
import { Spin, Table, Form, Modal, message, Tag, Space, Button, Breadcrumb, Tabs } from "antd";
import PlayerModal from "../../../components/player-modal";
import { useParams } from "react-router-dom";
import http from "@/request/http";
import { TeamItem, TableParams, ModalMode } from "@/types";
import { ParttitionEnum, ModalModeEnum, TeamDetailTabEnum } from "@/enum";
import { useAntdTable } from "ahooks";
import HeadFilter from "@/components/head-filter";
import TeamChart from "@/components/team-chart";
import TeamEditModal from "../components/team-edit-modal";
import { PositionEnum } from "@/constan";

import "./index.scss";

interface TeamDetailType extends TeamItem {}
type TabKeys = "players" | "course";

function TeamDetail() {
   const params = useParams();
   const { id } = params || {};
   const [form] = Form.useForm();
   const [teamDetail, setTeamDetail] = useState<TeamDetailType>();
   const [loading, setLoading] = useState<boolean>(false);
   const [createModal, setCreateModal] = useState<boolean>(false);
   const [modalMode, setModalMode] = useState<ModalMode>(ModalModeEnum.CREATE);
   const [playerModalInitValues, setPlayerModalInitValues] = useState<any>({});
   const [teamEditModal, setTeamEditModal] = useState<boolean>(false);
   const [tabKeys, setTabKeys] = useState<TabKeys>(TeamDetailTabEnum.PLAYERS);

   const getTeamDetail = async (id: number) => {
      setLoading(true);
      const res: any = await http("get", "/api/getTeamDetails", { id });
      const { success, data } = res;
      if (success) {
         setTeamDetail(data);
      }
      setLoading(false);
   };

   const getPlayers = async ({ current, pageSize }: TableParams, formValues: any) => {
      const res: any = await http("get", "/api/getAllPlayers", {
         current,
         pageSize,
         teamId: id,
         ...formValues,
      });
      const { success, data, total } = res;
      console.log("res--->", res);
      if (success) {
         return {
            list: data,
            total: total,
         };
      }
      return {
         list: [],
         total: 0,
      };
   };

   const onCreateOrEdit = async (values: any) => {
      const api = modalMode === ModalModeEnum.CREATE ? "/api/createPlayer" : "/api/updatePlayer";
      const res: any = await http("post", api, { ...values, teamId: id });
      const { success, errMsg } = res;
      if (success) {
         message.success(modalMode === ModalModeEnum.CREATE ? "创建成功" : "编辑成功");
         setCreateModal(false);
         submit();
      } else {
         message.error(errMsg);
      }
   };

   const onClose = () => setCreateModal(false);

   const onEditClick = (values: any) => {
      setModalMode(ModalModeEnum.EDIT);
      setPlayerModalInitValues(values);
      setCreateModal(true);
   };

   const onCreateClick = () => {
      setModalMode(ModalModeEnum.CREATE);
      setPlayerModalInitValues({});
      setCreateModal(true);
   };
   const onRemove = (id: number) => {
      Modal.confirm({
         title: "你确认要删除该球员吗?",
         content: "被删除的球员不会出现在该球队中，但是你依然可以再此添加回此球员",
         onOk: async () => {
            return new Promise<void>((resolve, reject) => {
               http("post", "/api/player/removePlayerFromTeam", { id })
                  .then((res: any) => {
                     if (res.success) {
                        message.success("删除成功");
                        submit();
                     } else {
                        message.error("删除失败");
                     }
                     resolve();
                  })
                  .catch((error) => {
                     reject(error);
                  });
            });
         },
      });
   };

   const onEditTeam = () => setTeamEditModal(true);
   const onSubmitEditTeam = async (values: any) => {
      const res = await http("post", "/api/editTeam", { id, ...values });
      const { success } = res;
      if (success) {
         message.success("Team updated successfully!");
         await getTeamDetail(id);
         setTeamEditModal(false);
      } else {
         message.error("Failed to update team!");
      }
   };

   const columns = [
      {
         title: "姓名",
         dataIndex: "name",
         align: "center",
      },
      {
         title: "年龄",
         align: "center",
         dataIndex: "age",
      },
      {
         title: "号码",
         align: "center",
         dataIndex: "number",
      },
      {
         title: "位置",
         align: "center",
         dataIndex: "position",
         render: (text: string) => {
            const positionArr = text?.split(",") || [];
            return positionArr.map((item) => {
               return <Tag color={PositionEnum[item]}>{item}</Tag>;
            });
         },
      },
      {
         title: "能力值",
         align: "center",
         dataIndex: "capability",
      },
      {
         title: "操作",
         align: "center",
         render: (text: string, record: any) => {
            return (
               <Space>
                  <Button
                     type="link"
                     onClick={() => {
                        onEditClick(record);
                     }}
                  >
                     编辑
                  </Button>
                  <Button
                     type="link"
                     onClick={() => {
                        onRemove(record.id);
                     }}
                  >
                     删除
                  </Button>
               </Space>
            );
         },
      },
   ];

   useEffect(() => {
      getTeamDetail(Number(id));
   }, []);

   const { tableProps, search } = useAntdTable(getPlayers, { form });
   const { submit } = search;

   return (
      <div>
         <Breadcrumb
            items={[
               {
                  title: <a href="/#/pages/team/center">球队中心</a>,
               },
               {
                  title: "球队详情",
               },
            ]}
            style={{ marginBottom: 12 }}
         />
         <Spin spinning={loading}>
            <Form form={form} onFinish={submit}>
               <div className="team-detail-container">
                  <div className="team-detail-top">
                     <div className="team-detail-info">
                        <div className="team-logo-wrap">
                           <img src={teamDetail?.logo} className="team-logo" />
                        </div>
                        <div className="team-info">
                           <span className="team-detail-title">{teamDetail?.teamName}</span>
                           <div className="team-info-item">
                              <span className="team-info-item-label">主教练:</span>
                              <span className="team-info-item-text">{teamDetail?.manager}</span>
                           </div>
                           <div className="team-info-item">
                              <span className="team-info-item-label">主场球馆:</span>
                              <span className="team-info-item-text">{teamDetail?.homeArena}</span>
                           </div>
                           <div className="team-info-item">
                              <span className="team-info-item-label">所在城市:</span>
                              <span className="team-info-item-text">{teamDetail?.city}</span>
                           </div>
                           <div className="team-info-item">
                              <span className="team-info-item-label">所在分区:</span>
                              <span className="team-info-item-text">
                                 {
                                    ParttitionEnum[
                                       teamDetail?.partition as keyof typeof ParttitionEnum
                                    ]
                                 }
                              </span>
                           </div>
                        </div>
                        <div className="team-edit">
                           <Button type="primary" onClick={onEditTeam}>
                              编辑
                           </Button>
                        </div>
                     </div>
                     <div className="team-chart-wrap">
                        <TeamChart />
                     </div>
                  </div>
                  <div className="team-player-table">
                     <Tabs
                        onChange={(key: any) => {
                           setTabKeys(key);
                        }}
                        defaultActiveKey={TeamDetailTabEnum.PLAYERS}
                        activeKey={tabKeys}
                     >
                        <Tabs.TabPane tab="关联球员" key={TeamDetailTabEnum.PLAYERS}>
                           <HeadFilter onCreate={onCreateClick} />
                           <Table
                              style={{ width: "100%" }}
                              {...tableProps}
                              columns={columns as any}
                              rowKey="id"
                           />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="球队赛程" key={TeamDetailTabEnum.COURSE}></Tabs.TabPane>
                     </Tabs>
                  </div>
               </div>
            </Form>
            <PlayerModal
               initValues={playerModalInitValues}
               open={createModal}
               onClose={onClose}
               onOk={onCreateOrEdit}
               mode={modalMode}
            />
            <TeamEditModal
               open={teamEditModal}
               onClose={() => setTeamEditModal(false)}
               values={teamDetail}
               onSubmit={onSubmitEditTeam}
            />
         </Spin>
      </div>
   );
}

export default TeamDetail;
