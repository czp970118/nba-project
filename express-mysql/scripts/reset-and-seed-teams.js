/**
 * 清空 team 表并重新插入 30 支 NBA 球队。
 * 会先清空 user_teams（收藏），并尝试将 player.teamId 置空；若 player.teamId 不允许 NULL 则改为清空 player 表。
 * 用法：express-mysql 目录下  npm run reset:teams
 */
const mysql = require("mysql");
const dbConfig = require("../app/config/db.config.js");
const { TEAMS, logo } = require("./nba-teams-data.js");

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

async function tableExists(name) {
	const rows = await query(
		`SELECT COUNT(*) AS c FROM information_schema.tables WHERE table_schema = ? AND table_name = ?`,
		[dbConfig.DB, name]
	);
	return rows[0].c > 0;
}

async function main() {
	const hasUserTeams = await tableExists("user_teams");
	const hasPlayer = await tableExists("player");

	await query("SET FOREIGN_KEY_CHECKS = 0");

	if (hasUserTeams) {
		await query("TRUNCATE TABLE `user_teams`");
		console.log("[reset] 已清空 user_teams");
	}

	if (hasPlayer) {
		try {
			await query("UPDATE `player` SET `teamId` = NULL");
			console.log("[reset] 已将 player.teamId 置空");
		} catch (e) {
			await query("TRUNCATE TABLE `player`");
			console.log("[reset] player.teamId 不可置空，已清空 player 表");
		}
	}

	await query("TRUNCATE TABLE `team`");
	console.log("[reset] 已清空 team");

	await query("SET FOREIGN_KEY_CHECKS = 1");

	for (const team of TEAMS) {
		const sql = `INSERT INTO \`team\` (\`teamName\`, \`city\`, \`homeArena\`, \`logo\`, \`manager\`, \`partition\`) VALUES (?, ?, ?, ?, ?, ?)`;
		const vals = [
			team.name,
			team.city,
			team.arena,
			logo(team.nbaId),
			team.coach,
			team.partition,
		];
		await query(sql, vals);
		console.log("[reset] 已插入:", team.name);
	}

	console.log(`[reset] 完成，共插入 ${TEAMS.length} 支球队。`);
	pool.end();
}

main().catch((e) => {
	console.error("[reset] 失败:", e.message);
	pool.end();
	process.exit(1);
});
