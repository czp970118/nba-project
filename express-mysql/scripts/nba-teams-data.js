/** 30 支 NBA 球队种子数据（与前端 constan / partition 一致） */
function logo(nbaId) {
	return `https://cdn.nba.com/logos/nba/${nbaId}/primary/L/logo.svg`;
}

const TEAMS = [
	{ name: "亚特兰大老鹰", city: "atlanta", partition: "es", arena: "州立农业球馆", coach: "奎因·斯奈德", nbaId: 1610612737 },
	{ name: "波士顿凯尔特人", city: "boston", partition: "atl", arena: "TD花园", coach: "乔·马兹拉", nbaId: 1610612738 },
	{ name: "布鲁克林篮网", city: "brooklyn", partition: "atl", arena: "巴克莱中心", coach: "霍尔迪·费尔南德斯", nbaId: 1610612751 },
	{ name: "夏洛特黄蜂", city: "charlotte", partition: "es", arena: "光谱中心", coach: "查尔斯·李", nbaId: 1610612766 },
	{ name: "芝加哥公牛", city: "chicago", partition: "center", arena: "联合中心", coach: "比利·多诺万", nbaId: 1610612741 },
	{ name: "克利夫兰骑士", city: "cleveland", partition: "center", arena: "火箭按揭球馆", coach: "肯尼·阿特金森", nbaId: 1610612739 },
	{ name: "达拉斯独行侠", city: "dallas", partition: "ws", arena: "美国航空中心", coach: "贾森·基德", nbaId: 1610612742 },
	{ name: "丹佛掘金", city: "denver", partition: "wn", arena: "鲍尔球馆", coach: "迈克尔·马龙", nbaId: 1610612743 },
	{ name: "底特律活塞", city: "detroit", partition: "center", arena: "小凯撒球馆", coach: "JB·比克斯塔夫", nbaId: 1610612765 },
	{ name: "金州勇士", city: "san_francisco_bay_area", partition: "pac", arena: "大通中心", coach: "史蒂夫·科尔", nbaId: 1610612744 },
	{ name: "休斯顿火箭", city: "houston", partition: "ws", arena: "丰田中心", coach: "伊梅·乌多卡", nbaId: 1610612745 },
	{ name: "印第安纳步行者", city: "indianapolis", partition: "center", arena: "甘布里奇球馆", coach: "里克·卡莱尔", nbaId: 1610612754 },
	{ name: "洛杉矶快船", city: "los_angeles", partition: "pac", arena: "直觉巨蛋", coach: "泰伦·卢", nbaId: 1610612746 },
	{ name: "洛杉矶湖人", city: "los_angeles", partition: "pac", arena: "加密网体育馆", coach: "JJ·雷迪克", nbaId: 1610612747 },
	{ name: "孟菲斯灰熊", city: "memphis", partition: "ws", arena: "联邦快递球馆（孟菲斯）", coach: "泰勒·詹金斯", nbaId: 1610612763 },
	{ name: "迈阿密热火", city: "miami", partition: "es", arena: "Kaseya中心", coach: "埃里克·斯波尔斯特拉", nbaId: 1610612748 },
	{ name: "密尔沃基雄鹿", city: "milwaukee", partition: "center", arena: "第一服务广场", coach: "道格·里弗斯", nbaId: 1610612749 },
	{ name: "明尼苏达森林狼", city: "minneapolis", partition: "wn", arena: "标靶中心", coach: "克里斯·芬奇", nbaId: 1610612750 },
	{ name: "新奥尔良鹈鹕", city: "new_orleans", partition: "ws", arena: "冰沙王中心", coach: "威利·格林", nbaId: 1610612740 },
	{ name: "纽约尼克斯", city: "new_york_city", partition: "atl", arena: "麦迪逊广场花园（纽约尼克斯）", coach: "汤姆·锡伯杜", nbaId: 1610612752 },
	{ name: "俄克拉荷马城雷霆", city: "oklahoma_city", partition: "wn", arena: "Paycom中心", coach: "马克·戴格诺特", nbaId: 1610612760 },
	{ name: "奥兰多魔术", city: "orlando", partition: "es", arena: "起亚中心", coach: "贾马尔·莫斯利", nbaId: 1610612753 },
	{ name: "费城76人", city: "philadelphia", partition: "atl", arena: "富国银行中心", coach: "尼克·纳斯", nbaId: 1610612755 },
	{ name: "菲尼克斯太阳", city: "phoenix", partition: "pac", arena: "足迹中心", coach: "迈克·布登霍尔泽", nbaId: 1610612756 },
	{ name: "波特兰开拓者", city: "portland", partition: "wn", arena: "摩达中心", coach: "昌西·比卢普斯", nbaId: 1610612757 },
	{ name: "萨克拉门托国王", city: "sacramento", partition: "pac", arena: "黄金一号中心", coach: "道格·克里斯蒂", nbaId: 1610612758 },
	{ name: "圣安东尼奥马刺", city: "san_antonio", partition: "ws", arena: "弗罗斯特银行中心", coach: "格雷格·波波维奇", nbaId: 1610612759 },
	{ name: "多伦多猛龙", city: "toronto", partition: "atl", arena: "丰业银行体育馆", coach: "达尔科·拉贾科维奇", nbaId: 1610612761 },
	{ name: "犹他爵士", city: "salt_lake_city", partition: "wn", arena: "达美航空中心", coach: "威尔·哈迪", nbaId: 1610612762 },
	{ name: "华盛顿奇才", city: "washington_dc", partition: "es", arena: "第一资本体育馆", coach: "布莱恩·基夫", nbaId: 1610612764 },
];

module.exports = { TEAMS, logo };
