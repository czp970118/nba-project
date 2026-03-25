const sql = require('./db.js');

class PlayerModel {
	getAllPlayers = (params, result) => {
		const pageSize = Number(params.pageSize) || 10;
		const pageNum = Number(params.pageNum || params.current) || 1;
		const teamId = params.teamId;
		const name = params.name;

		const where = [];
		const values = [];
		if (teamId !== undefined && teamId !== null && teamId !== '') {
			where.push('teamId = ?');
			values.push(Number(teamId));
		}
		if (name) {
			where.push('name LIKE ?');
			values.push(`%${name}%`);
		}
		const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
		const offset = (pageNum - 1) * pageSize;

		const listSql = `SELECT * FROM player ${whereSql} ORDER BY id ASC LIMIT ? OFFSET ?`;
		const totalSql = `SELECT COUNT(*) AS totalCount FROM player ${whereSql}`;

		sql.query(listSql, [...values, pageSize, offset], (error, rows) => {
			if (error) {
				result(error, null);
				return;
			}
			sql.query(totalSql, values, (totalErr, totalRes) => {
				if (totalErr) {
					result(totalErr, null);
					return;
				}
				result(null, {
					success: true,
					data: rows,
					total: totalRes[0].totalCount,
					msg: '',
					code: 200,
				});
			});
		});
	};

	getPlayerById = (params, result) => {
		const { id } = params;
		if (!id) {
			result(null, { success: false, message: '缺少球员 id', code: 400 });
			return;
		}
		sql.query('SELECT * FROM player WHERE id = ? LIMIT 1', [id], (err, rows) => {
			if (err) {
				result(err, null);
				return;
			}
			if (!rows || rows.length === 0) {
				result(null, { success: false, message: '球员不存在', code: 404 });
				return;
			}
			result(null, { success: true, data: rows[0], code: 200 });
		});
	};

	createPlyer = (params, result) => {
		const {
			teamId,
			number,
			name,
			age,
			position,
			capability,
			introduction,
			avatar,
		} = params;
		const posStr = Array.isArray(position) ? position.join(',') : position || '';

		sql.query(
			'SELECT id FROM player WHERE teamId = ? AND number = ? LIMIT 1',
			[teamId, number],
			(error, dup) => {
				if (error) {
					result(error, null);
					return;
				}
				if (dup && dup.length > 0) {
					result(null, { success: false, msg: '该号码已占用，请重新选择号码', code: 500 });
					return;
				}

				const cols = [
					'name',
					'teamId',
					'age',
					'number',
					'position',
					'capability',
					'introduction',
				];
				const vals = [
					name,
					teamId,
					age ?? null,
					number,
					posStr,
					capability ?? null,
					introduction ?? null,
				];
				if (avatar) {
					cols.push('avatar');
					vals.push(avatar);
				}

				const placeholders = cols.map(() => '?').join(',');
				const colSql = cols.map((c) => `\`${c}\``).join(', ');
				const insertSql = `INSERT INTO player (${colSql}) VALUES (${placeholders})`;

				sql.query(insertSql, vals, (err) => {
					if (err) {
						result(err, null);
						return;
					}
					result(null, { success: true, msg: 'created success', code: 200 });
				});
			}
		);
	};

	updatePlayerById = (id, params, result) => {
		const keys = Object.keys(params).filter((k) => params[k] !== undefined);
		if (!keys.length) {
			result(null, { success: false, msg: '无更新字段', code: 400 });
			return;
		}
		const setSql = keys.map((k) => `\`${k}\` = ?`).join(', ');
		const sqlStr = `UPDATE player SET ${setSql} WHERE id = ?`;
		const vals = [...keys.map((k) => params[k]), id];
		sql.query(sqlStr, vals, (err) => {
			if (err) {
				result(err, null);
				return;
			}
			result(null, { success: true, msg: 'updated success', code: 200 });
		});
	};
}

module.exports = new PlayerModel();
