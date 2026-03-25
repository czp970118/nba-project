import { useEffect, useState } from "react";
import { Spin, Descriptions, Tag, Breadcrumb, Button, Empty } from "antd";
import { useNavigate, useParams, Link } from "react-router-dom";
import http from "@/request/http";
import { PlayerItem, TeamItem } from "@/types";
import { ParttitionEnum } from "@/enum";
import { PositionEnum } from "@/constan";
import { playerPosterImageUrl } from "@/data/player-poster-images";

import "./index.scss";

function PlayerDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [player, setPlayer] = useState<PlayerItem | null>(null);
	const [team, setTeam] = useState<TeamItem | null>(null);

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			const res: any = await http("get", "/api/getPlayerDetails", { id });
			if (res?.success && res.data) {
				setPlayer(res.data);
				const tid = res.data.teamId;
				if (tid != null) {
					const tr: any = await http("get", "/api/getTeamDetails", { id: tid });
					if (tr?.success && tr.data) {
						setTeam(tr.data);
					}
				}
			} else {
				setPlayer(null);
			}
			setLoading(false);
		};
		if (id) load();
	}, [id]);

	if (!loading && !player) {
		return (
			<div className="player-detail-page">
				<Empty description="未找到该球员" />
				<Button type="link" onClick={() => navigate("/pages/player/center")}>
					返回球员中心
				</Button>
			</div>
		);
	}

	const positions =
		player?.position?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];

	return (
		<div className="player-detail-page">
			<Breadcrumb
				style={{ marginBottom: 16 }}
				items={[
					{
						title: (
							<Link to="/pages/player/center" className="player-detail-bc">
								球员中心
							</Link>
						),
					},
					...(team
						? [
								{
									title: (
										<Link
											to={`/pages/team/detail/${team.teamId}`}
											className="player-detail-bc"
										>
											{team.teamName}
										</Link>
									),
								},
						  ]
						: []),
					{ title: "球员详情" },
				]}
			/>

			<Spin spinning={loading}>
				{player && (
					<div className="player-detail-card">
						<div className="player-detail-head">
							<div className="player-detail-avatar-wrap">
								<img
									src={playerPosterImageUrl(player)}
									alt=""
									className="player-detail-avatar"
								/>
							</div>
							<div className="player-detail-title-block">
								<h1 className="player-detail-name">{player.name}</h1>
								{team && (
									<div className="player-detail-team-line">
										<img src={team.logo} alt="" className="player-detail-team-logo" />
										<Link to={`/pages/team/detail/${team.teamId}`}>{team.teamName}</Link>
									</div>
								)}
							</div>
						</div>

						<Descriptions column={1} bordered size="middle" className="player-detail-desc">
							<Descriptions.Item label="球衣号码">{player.number ?? "—"}</Descriptions.Item>
							<Descriptions.Item label="年龄">{player.age ?? "—"}</Descriptions.Item>
							<Descriptions.Item label="位置">
								{positions.length
									? positions.map((p) => (
											<Tag
												key={p}
												color={
													(PositionEnum as Record<string, string>)[p] || "blue"
												}
											>
												{p}
											</Tag>
									  ))
									: "—"}
							</Descriptions.Item>
							<Descriptions.Item label="能力值">{player.capability ?? "—"}</Descriptions.Item>
							{team && (
								<Descriptions.Item label="所在分区">
									{ParttitionEnum[team.partition as keyof typeof ParttitionEnum] ?? team.partition}
								</Descriptions.Item>
							)}
							<Descriptions.Item label="个人介绍">
								{player.introduction || "暂无介绍"}
							</Descriptions.Item>
						</Descriptions>
					</div>
				)}
			</Spin>
		</div>
	);
}

export default PlayerDetail;
