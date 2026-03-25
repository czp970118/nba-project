/**
 * 创建 player 表（若不存在）并插入 10 名球员，按 teamId 顺序关联前 10 支球队。
 * 用法：express-mysql 目录下  npm run seed:players
 */
const mysql = require("mysql");
const dbConfig = require("../app/config/db.config.js");

const pool = mysql.createPool({
	host: dbConfig.HOST,
	user: dbConfig.USER,
	password: dbConfig.PASSWORD,
	database: dbConfig.DB,
	multipleStatements: true,
});

function query(sql, params = []) {
	return new Promise((resolve, reject) => {
		pool.query(sql, params, (err, rows) => {
			if (err) reject(err);
			else resolve(rows);
		});
	});
}

const PLAYERS = [
	{ name: "特雷·杨", number: 11, age: 26, position: "PG", capability: 92, introduction: "亚特兰大老鹰当家控卫，三分与抛投极具威胁。" },
	{ name: "杰森·塔图姆", number: 0, age: 27, position: "SF,PF", capability: 94, introduction: "凯尔特人核心前锋，攻防一体。" },
	{ name: "卡梅伦·托马斯", number: 24, age: 24, position: "SG", capability: 86, introduction: "篮网得分手，单打能力突出。" },
	{ name: "拉梅洛·鲍尔", number: 1, age: 23, position: "PG", capability: 88, introduction: "黄蜂组织核心，传球视野开阔。" },
	{ name: "德玛尔·德罗赞", number: 11, age: 35, position: "SF,PF", capability: 87, introduction: "公牛中距离大师，关键球稳定。" },
	{ name: "多诺万·米切尔", number: 45, age: 29, position: "SG", capability: 93, introduction: "骑士后场核心，爆发力出色。" },
	{ name: "卢卡·东契奇", number: 77, age: 26, position: "PG", capability: 97, introduction: "独行侠全能持球大核。" },
	{ name: "尼古拉·约基奇", number: 15, age: 30, position: "C", capability: 98, introduction: "掘金中锋，传球与篮下统治力顶级。" },
	{ name: "凯德·坎宁安", number: 2, age: 23, position: "PG", capability: 89, introduction: "活塞建队基石，持球进攻全面。" },
	{ name: "斯蒂芬·库里", number: 30, age: 37, position: "PG", capability: 95, introduction: "勇士历史级射手，改变比赛方式。" },
];

async function ensureTable() {
	await query(`
CREATE TABLE IF NOT EXISTS \`player\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`name\` varchar(128) DEFAULT NULL,
  \`teamId\` int DEFAULT NULL,
  \`age\` int DEFAULT NULL,
  \`number\` int DEFAULT NULL,
  \`position\` varchar(255) DEFAULT NULL,
  \`capability\` int DEFAULT NULL,
  \`introduction\` text,
  \`avatar\` varchar(512) DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`idx_player_team\` (\`teamId\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`);
}

async function main() {
	await ensureTable();
	const teams = await query(
		"SELECT teamId FROM team ORDER BY teamId ASC LIMIT 10"
	);
	if (!teams.length) {
		console.error("[seed:players] 无球队数据，请先执行 npm run reset:teams 或 seed:teams");
		pool.end();
		process.exit(1);
	}

	await query("DELETE FROM player");

	for (let i = 0; i < PLAYERS.length; i++) {
		const p = PLAYERS[i];
		const teamId = teams[i] ? teams[i].teamId : teams[teams.length - 1].teamId;
		await query(
			`INSERT INTO \`player\` (\`name\`, \`teamId\`, \`age\`, \`number\`, \`position\`, \`capability\`, \`introduction\`) VALUES (?, ?, ?, ?, ?, ?, ?)`,
			[p.name, teamId, p.age, p.number, p.position, p.capability, p.introduction]
		);
		console.log("[seed:players] 已插入:", p.name, "teamId=", teamId);
	}

	console.log("[seed:players] 完成，共 10 名球员。");
	pool.end();
}

main().catch((e) => {
	console.error("[seed:players] 失败:", e.message);
	pool.end();
	process.exit(1);
});
