/**
 * 按 teamName 合并重复球队：保留 teamId 最小的一条，合并 player / user_teams 外键后删除多余行。
 * 用法：express-mysql 目录下  npm run dedupe:teams
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

async function tableExists(name) {
	const rows = await query(
		`SELECT COUNT(*) AS c FROM information_schema.tables WHERE table_schema = ? AND table_name = ?`,
		[dbConfig.DB, name]
	);
	return rows[0].c > 0;
}

async function main() {
	const dupNames = await query(
		`SELECT teamName, MIN(teamId) AS keepId, GROUP_CONCAT(teamId ORDER BY teamId) AS ids
		 FROM \`team\` GROUP BY teamName HAVING COUNT(*) > 1`
	);

	if (!dupNames.length) {
		console.log("[dedupe] 未发现重复队名，无需处理。");
		pool.end();
		return;
	}

	const hasPlayer = await tableExists("player");
	const hasUserTeams = await tableExists("user_teams");

	const inList = (ids) => ids.map(() => "?").join(",");

	for (const row of dupNames) {
		const { teamName, keepId, ids } = row;
		const allIds = String(ids)
			.split(",")
			.map((id) => Number(id.trim()))
			.filter(Boolean);
		const removeIds = allIds.filter((id) => id !== keepId);
		if (!removeIds.length) continue;

		console.log(`[dedupe] ${teamName}: 保留 teamId=${keepId}, 删除 ${removeIds.join(",")}`);

		if (hasPlayer) {
			const r = await query(`UPDATE player SET teamId = ? WHERE teamId IN (${inList(removeIds)})`, [
				keepId,
				...removeIds,
			]);
			console.log(`  -> player 更新 ${r.affectedRows || 0} 行`);
		}

		if (hasUserTeams) {
			await query(
				`DELETE ut FROM user_teams ut
				 INNER JOIN user_teams ut2
				   ON ut.user_id = ut2.user_id AND ut2.team_id = ?
				 WHERE ut.team_id IN (${inList(removeIds)})`,
				[keepId, ...removeIds]
			);
			const r2 = await query(`UPDATE user_teams SET team_id = ? WHERE team_id IN (${inList(removeIds)})`, [
				keepId,
				...removeIds,
			]);
			console.log(`  -> user_teams 更新 ${r2.affectedRows || 0} 行`);
		}

		const r3 = await query(`DELETE FROM \`team\` WHERE teamId IN (${inList(removeIds)})`, removeIds);
		console.log(`  -> team 删除 ${r3.affectedRows || 0} 行`);
	}

	console.log("[dedupe] 完成。");
	pool.end();
}

main().catch((e) => {
	console.error("[dedupe] 失败:", e.message);
	pool.end();
	process.exit(1);
});
