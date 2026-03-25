import { Link } from "react-router-dom";
import { PlayerItem } from "@/types";
import { playerCardPosterStyle } from "@/data/player-poster-images";
import "./index.scss";

interface Props {
	player: PlayerItem;
}

const PlayerCard = (props: Props) => {
	const { player } = props;
	const { name, introduction, id, number, capability, position, age } = player;
	const posFirst = position?.split(",")[0]?.trim() || "—";
	const subtitle = [number != null ? `#${number}` : null, posFirst].filter(Boolean).join(" · ");

	return (
		<Link
			to={`/pages/player/detail/${id}`}
			className="player-card"
			aria-label={`${name}，查看详情`}
		>
			<div className="player-card__top">
				<div className="player-card__img" style={playerCardPosterStyle(player)} />
				<div className="player-card__shade" />
				<div className="player-card__name-only">
					<span>{name}</span>
				</div>
			</div>

			<div className="player-card__detail">
				<h3 className="player-card__detail-name">{name}</h3>
				<p className="player-card__detail-sub">{subtitle}</p>
				{age != null && <p className="player-card__detail-age">年龄 {age} 岁</p>}
				<p className="player-card__detail-bio">
					{introduction || "暂无介绍"}
				</p>
				{capability != null && (
					<p className="player-card__detail-cap">能力值 {capability}</p>
				)}
				<span className="player-card__detail-btn">了解更多</span>
			</div>
		</Link>
	);
};

export default PlayerCard;
