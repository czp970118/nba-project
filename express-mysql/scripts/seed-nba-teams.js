/**
 * 向 MySQL `team` 表插入 NBA 全部 30 支球队（已存在则跳过）。
 * 用法：在 express-mysql 目录执行  npm run seed:teams
 */
const mysql = require("mysql");
const dbConfig = require("../app/config/db.config.js");
const { TEAMS, logo } = require("./nba-teams-data.js");

const pool = mysql.createPool({
	host: dbConfig.HOST,
	user: dbConfig.USER,
	password: dbConfig.PASSWORD,
	database: dbConfig.DB,
});

function insertOne(team) {
	return new Promise((resolve, reject) => {
		const sql = `
			INSERT INTO \`team\` (\`teamName\`, \`city\`, \`homeArena\`, \`logo\`, \`manager\`, \`partition\`)
			SELECT ?, ?, ?, ?, ?, ?
			FROM DUAL
			WHERE NOT EXISTS (SELECT 1 FROM \`team\` t WHERE t.\`teamName\` = ? LIMIT 1)
		`;
		const vals = [
			team.name,
			team.city,
			team.arena,
			logo(team.nbaId),
			team.coach,
			team.partition,
			team.name,
		];
		pool.query(sql, vals, (err, result) => {
			if (err) reject(err);
			else resolve(result);
		});
	});
}

async function main() {
	let inserted = 0;
	let skipped = 0;
	for (const team of TEAMS) {
		try {
			const result = await insertOne(team);
			if (result.affectedRows === 1) {
				console.log("[seed] 已插入:", team.name);
				inserted++;
			} else {
				console.log("[seed] 已存在，跳过:", team.name);
				skipped++;
			}
		} catch (e) {
			console.error("[seed] 失败:", team.name, e.message);
		}
	}
	console.log(`[seed] 完成。新插入 ${inserted} 条，跳过 ${skipped} 条。`);
	pool.end();
}

main().catch((e) => {
	console.error(e);
	pool.end();
	process.exit(1);
});
