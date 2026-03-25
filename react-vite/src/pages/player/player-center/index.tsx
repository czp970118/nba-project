import { useEffect, useState } from "react";
import { Spin, Empty, Row, Col, message } from "antd";
import http from "@/request/http";
import PlayerCard from "./player-card";
import { PlayerItem } from "@/types";

import "./index.scss";

function PlayerCenter() {
	const [players, setPlayers] = useState<PlayerItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			try {
				const res: any = await http("get", "/api/getAllPlayers", {
					current: 1,
					pageSize: 100,
				});
				const list = res?.data;
				if (res?.success && Array.isArray(list)) {
					setPlayers(list);
				} else {
					setPlayers([]);
				}
			} catch {
				message.error("加载球员列表失败，请确认后端已启动（localhost:8081）");
				setPlayers([]);
			} finally {
				setLoading(false);
			}
		};
		load();
	}, []);

	return (
		<div className="player-center-page">
			<div className="player-center-header">
				<h2 className="player-center-title">球员中心</h2>
				<p className="player-center-subtitle">点击卡片查看球员详情</p>
			</div>

			<Spin spinning={loading} tip="加载中..." size="large">
				{!loading && players.length === 0 ? (
					<Empty
						className="player-center-empty"
						description="暂无球员数据。请在 express-mysql 目录执行 npm run seed:players 后刷新页面。"
					/>
				) : (
					<Row gutter={[16, 16]} className="player-center-grid">
						{players.map((p) => (
							<Col key={p.id} xs={12} sm={8} md={6} lg={4} xl={4}>
								<PlayerCard player={p} />
							</Col>
						))}
					</Row>
				)}
			</Spin>
		</div>
	);
}

export default PlayerCenter;
