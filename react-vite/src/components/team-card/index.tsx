import {
   EditOutlined,
   HeartOutlined,
   HeartFilled,
   EnvironmentOutlined,
   UserOutlined,
   HomeOutlined,
} from "@ant-design/icons";
import { TeamItem } from "../../types";
import { ParttitionEnum } from "@/enum";
import "./index.scss";

interface IProps {
   item: TeamItem;
   onEdit: (id: number) => void;
   onFavor: (id: number, favor: boolean) => void;
}

const TeamCard = (props: IProps) => {
   const { item, onEdit, onFavor } = props;
   const FavorIcon = item.favor ? HeartFilled : HeartOutlined;
   const partitionLabel = ParttitionEnum[item.partition] ?? item.partition;

	return (
		<div className="team-card-cell">
			<div className="team-card">
				<div className="team-card__hero">
					<div className="team-card__hero-inner">
						<div className="team-card__logo-wrap">
							<img alt={item.teamName} src={item.logo} />
						</div>
						<div className="team-card__title-block">
							<h3 className="team-card__name">{item.teamName}</h3>
							<span className="team-card__tag">{partitionLabel}</span>
						</div>
					</div>
				</div>

				<div className="team-card__body">
					<div className="team-card__row">
						<EnvironmentOutlined />
						<span>
							<span className="team-card__label">所在城市</span>
							{item.city}
						</span>
					</div>
					<div className="team-card__row">
						<UserOutlined />
						<span>
							<span className="team-card__label">主教练</span>
							{item.manager}
						</span>
					</div>
					<div className="team-card__row">
						<HomeOutlined />
						<span>
							<span className="team-card__label">主场球馆</span>
							{item.homeArena}
						</span>
					</div>
				</div>

				<div className="team-card__footer">
					<button type="button" className="team-card__action" onClick={() => onEdit(item.teamId)}>
						<EditOutlined />
						编辑
					</button>
					<button
						type="button"
						className={`team-card__action${
							item.favor ? " team-card__action--favor-active" : ""
						}`}
						onClick={() => onFavor(item.teamId, !item.favor)}
					>
						<FavorIcon />
						{item.favor ? "已收藏" : "收藏"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default TeamCard;
