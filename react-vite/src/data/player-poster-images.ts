import type { CSSProperties } from "react";
import type { PlayerItem } from "@/types";

/**
 * 无球员头像时的占位图：仅使用「篮球场 / 篮球运动」相关素材。
 * - Unsplash：经校验可访问的球场、运动场景（固定 ID，不用随机串号）。
 * - Pexels：篮球/运动类摄影 ID（与此前连续 40658xx 无关，避免混进非运动图）。
 * 按 player.id 取模轮换。
 */
const UNSPLASH_BASKETBALL = [
	"https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=960&h=1280&q=85",
	"https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=960&h=1280&q=85",
	"https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=960&h=1280&q=85",
	"https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=960&h=1280&q=85",
] as const;

function pexelsBasketballUrl(photoId: number): string {
	return `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=960&h=1280&fit=crop`;
}

/** 均为篮球/运动类摄影（已单独校验 URL 可访问） */
const PEXELS_BASKETBALL_IDS = [
	1752757, 1634521, 358042, 2169302, 2834917, 1905009, 274422, 8841018, 8523521, 2886006,
] as const;

const ALL_POSTER_URLS: readonly string[] = [
	...UNSPLASH_BASKETBALL,
	...PEXELS_BASKETBALL_IDS.map((id) => pexelsBasketballUrl(id)),
];

export function playerPosterImageUrl(player: Pick<PlayerItem, "id" | "avatar">): string {
	if (player.avatar) {
		return player.avatar;
	}
	const i = Math.abs(Number(player.id)) % ALL_POSTER_URLS.length;
	return ALL_POSTER_URLS[i];
}

export function playerCardPosterStyle(player: PlayerItem): CSSProperties {
	return {
		backgroundImage: `url(${playerPosterImageUrl(player)})`,
	};
}
