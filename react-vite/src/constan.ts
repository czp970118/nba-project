export const PARTTITION_DATA = [
	{ label: '东南分区', value: 'es' },
	{ label: '大西洋分区', value: 'atl' },
	{ label: '中央分区', value: 'center' },
	{ label: '西南分区', value: 'ws' },
	{ label: '西北分区', value: 'wn' },
	{ label: '太平洋分区', value: 'pac' }
]

export const POSITION_DATASOURCE = [
	{ label: "控卫", value: "PG", },
	{ label: "分卫", value: "SG" },
	{ label: "小前锋", value: "SF" },
	{ label: "大前锋", value: "PF" },
	{ label: "中锋", value: "C" },
];

export enum PositionEnum {
	PG = "green",
	SG = "cyan",
	SF = "blue",
	PF = "geekblue",
	C = "red",
};

export const AMERICA_CITY_DATA = [
	{
		"title": "加利福尼亚州",
		"value": "california",
		"selectable": false,
		"children": [
			{
				"title": "洛杉矶",
				"value": "los_angeles"
			},
			{
				"title": "旧金山湾区",
				"value": "san_francisco_bay_area"
			},
			{
				"title": "萨克拉门托",
				"value": "sacramento"
			}
		]
	},
	{
		"title": "得克萨斯州",
		"value": "texas",
		"selectable": false,
		"children": [
			{
				"title": "休斯顿",
				"value": "houston"
			},
			{
				"title": "达拉斯",
				"value": "dallas"
			},
			{
				"title": "圣安东尼奥",
				"value": "san_antonio"
			}
		]
	},
	{
		"title": "佛罗里达州",
		"value": "florida",
		"selectable": false,
		"children": [
			{
				"title": "迈阿密",
				"value": "miami"
			},
			{
				"title": "奥兰多",
				"value": "orlando"
			}
		]
	},
	{
		"title": "纽约州",
		"value": "new_york",
		"selectable": false,
		"children": [
			{
				"title": "纽约市",
				"value": "new_york_city"
			},
			{
				"title": "布鲁克林",
				"value": "brooklyn"
			}
		]
	},
	{
		"title": "马萨诸塞州",
		"value": "massachusetts",
		"selectable": false,
		"children": [
			{
				"title": "波士顿",
				"value": "boston"
			}
		]
	},
	{
		"title": "安大略省",
		"value": "ontario",
		"selectable": false,
		"children": [
			{
				"title": "多伦多",
				"value": "toronto"
			}
		]
	},
	{
		"title": "北卡罗来纳州",
		"value": "north_carolina",
		"selectable": false,
		"children": [
			{
				"title": "夏洛特",
				"value": "charlotte"
			}
		]
	},
	{
		"title": "威斯康星州",
		"value": "wisconsin",
		"selectable": false,
		"children": [
			{
				"title": "密尔沃基",
				"value": "milwaukee"
			}
		]
	},
	{
		"title": "路易斯安那州",
		"value": "louisiana",
		"selectable": false,
		"children": [
			{
				"title": "新奥尔良",
				"value": "new_orleans"
			}
		]
	},
	{
		"title": "伊利诺伊州",
		"value": "illinois",
		"selectable": false,
		"children": [
			{
				"title": "芝加哥",
				"value": "chicago"
			}
		]
	},
	{
		"title": "宾夕法尼亚州",
		"value": "pennsylvania",
		"selectable": false,
		"children": [
			{
				"title": "费城",
				"value": "philadelphia"
			}
		]
	},
	{
		"title": "乔治亚州",
		"value": "georgia",
		"selectable": false,
		"children": [
			{
				"title": "亚特兰大",
				"value": "atlanta"
			}
		]
	},
	{
		"title": "华盛顿特区",
		"value": "district_of_columbia",
		"selectable": false,
		"children": [
			{
				"title": "华盛顿",
				"value": "washington_dc"
			}
		]
	},
	{
		"title": "犹他州",
		"value": "utah",
		"selectable": false,
		"children": [
			{
				"title": "盐湖城",
				"value": "salt_lake_city"
			}
		]
	},
	{
		"title": "俄勒冈州",
		"value": "oregon",
		"selectable": false,
		"children": [
			{
				"title": "波特兰",
				"value": "portland"
			}
		]
	},
	{
		"title": "俄亥俄州",
		"value": "ohio",
		"selectable": false,
		"children": [
			{
				"title": "克利夫兰",
				"value": "cleveland"
			}
		]
	},
	{
		"title": "明尼苏达州",
		"value": "minnesota",
		"selectable": false,
		"children": [
			{
				"title": "明尼阿波利斯",
				"value": "minneapolis"
			}
		]
	},
	{
		"title": "俄克拉荷马州",
		"value": "oklahoma",
		"selectable": false,
		"children": [
			{
				"title": "俄克拉荷马城",
				"value": "oklahoma_city"
			}
		]
	},
	{
		"title": "科罗拉多州",
		"value": "colorado",
		"selectable": false,
		"children": [
			{
				"title": "丹佛",
				"value": "denver"
			}
		]
	},
	{
		"title": "印第安纳州",
		"value": "indiana",
		"selectable": false,
		"children": [
			{
				"title": "印第安纳波利斯",
				"value": "indianapolis"
			}
		]
	},
	{
		"title": "密歇根州",
		"value": "michigan",
		"selectable": false,
		"children": [
			{
				"title": "底特律",
				"value": "detroit"
			}
		]
	},
	{
		"title": "亚利桑那州",
		"value": "arizona",
		"selectable": false,
		"children": [
			{
				"title": "菲尼克斯",
				"value": "phoenix"
			}
		]
	},
	{
		"title": "田纳西州",
		"value": "tennessee",
		"selectable": false,
		"children": [
			{
				"title": "孟菲斯市",
				"value": "memphis"
			}
		]
	}
]