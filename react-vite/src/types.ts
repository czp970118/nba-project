import { ParttitionEnum } from "@/enum";
export interface TeamItem {
	city: string;
	teamId: number;
	teamName: string;
	partition: keyof typeof ParttitionEnum;
	logo: string;
	manager: string;
	homeArena: string;
	favor?: boolean;
}

export interface TableParams {
	current?: number;
	pageSize?: number;
}

export type ModalMode = 'create' | 'edit';

export enum TeamCenterKeyEnum {
	ALL = 'all',
	MY = 'my'
}

export type TabKey = "all" | "my";

export interface PlayerItem {
	id: number;
	name: string;
	teamId: number | null;
	age?: number;
	number?: number;
	position?: string;
	capability?: number;
	introduction?: string;
	avatar?: string;
}
