const sql = require('./db.js');
const { generateInsertSql } = require('../utils.js');
const axios = require('axios');

class TeamModel {
	constructor() {
	}

	getUserFavorTeams = async function ({ token, userId }) {
		try {
			const res = await axios.get(`http://127.0.0.1:7001/user/getUserFavorTeams?token=${token}&userId=${userId}`);
			return res.data;
		} catch (error) {
			throw new Error("Failed to get user favorite teams");
		}
	};

	getTeamListWithUserId = async function (params) {
		const { start, pageSize, partition, keywords, token } = params
		const favorRes = await this.getUserFavorTeams({ token });
		const { teamIdList = [] } = favorRes
		const teamIdsString = teamIdList.join(',');
		let SQL = `SELECT * FROM team WHERE teamId IN (${teamIdsString}) `;
		let values = [];
		if (partition || keywords) {
			SQL += 'AND ';
			if (partition) {
				SQL += '`partition` = ? ';
				values.push(partition);
			};
			if (keywords) {
				if (values.length > 0) {
					SQL += 'AND ';
				}
				SQL += '`teamName` LIKE ? ';
				values.push(`%${keywords}%`);
			};
		}

		return new Promise((resolve, reject) => {
			sql.query(`${SQL} LIMIT ? OFFSET ?`, [...values, Number(pageSize), start], (err, results) => {
				if (err) return reject(err);
				resolve({
					success: true,
					data: {
						list: results.length ? results.map((item) => ({ ...item, favor: true })) : [],
						total: teamIdList.length,
					}
				});
			});
		});

	}

	getTeamsWithoutUserId = async function (params) {
		const { start, pageSize, partition, keywords, token } = params
		const favorRes = await this.getUserFavorTeams({ token });
		const { teamIdList = [] } = favorRes
		const teamIdsString = teamIdList.join(',');
		let SQL = `SELECT * FROM team WHERE teamId IN (${teamIdsString}) `;
		let values = [];
		if (partition || keywords) {
			SQL += 'AND ';
			if (partition) {
				SQL += '`partition` = ? ';
				values.push(partition);
			};
			if (keywords) {
				if (values.length > 0) {
					SQL += 'AND ';
				}
				SQL += '`teamName` LIKE ? ';
				values.push(`%${keywords}%`);
			};
		}

		return new Promise((resolve, reject) => {
			sql.query(`${SQL} LIMIT ? OFFSET ?`, [...values, Number(pageSize), start], (err, results) => {
				if (err) return reject(err);
				resolve({
					success: true,
					data: {
						list: results.length ? results.map((item) => ({ ...item, favor: true })) : [],
						total: teamIdList.length,
					}
				});
			});
		});
	}

	getTeamList = async function (params) {
		const { start, pageSize, partition, keywords, isMine, teamIdList = [] } = params
		let SQL = `SELECT * FROM team `;
		let values = [];

		if (partition || keywords || isMine === 'true') {
			SQL += ` WHERE `
			if (isMine === 'true') {
				const teamIdsString = teamIdList.join(',')
				SQL += `teamId IN (${teamIdsString})`
			}
			if (partition) {
				SQL += '`partition` = ? ';
				values.push(partition);
			};
			if (keywords) {
				if (values.length > 0) {
					SQL += 'AND ';
				}
				SQL += '`teamName` LIKE ? ';
				values.push(`%${keywords}%`);
			};
		}

		return new Promise((resolve, reject) => {
			sql.query(`${SQL} LIMIT ? OFFSET ?`, [...values, Number(pageSize), start], (err, results) => {
				if (err) return reject(err);
				resolve({
					success: true,
					data: results
				});
			});
		});
	}

	getTotalCount = async function () {
		return new Promise((resolve, reject) => {
			sql.query(`SELECT COUNT(*) AS totalCount FROM team`, (err, result) => {
				if (err) return reject(err);
				resolve({
					success: true,
					total: result[0].totalCount
				});
			})
		});
	};

	async getAllTeams(params, result) {
		const { pageSize = 10, pageNum = 1, token, } = params;
		const start = (pageNum - 1) * pageSize;
		const isMine = params.isMine === 'true';
		try {
			// 验证页码参数
			if (isNaN(pageSize) || isNaN(pageNum) || pageSize < 1 || pageNum < 1) {
				throw new Error("Invalid page number or page size");
			};
			if (isMine) {
				const res = await this.getTeamListWithUserId({ ...params, start });
				if (res.success) {
					return result(null, {
						code: 200,
						message: '',
						success: true,
						data: res.data,
					});
				}
			} else {
				const [listRes, totalRes, favorRes] = await Promise.all([
					this.getTeamList({ ...params, start }),
					this.getTotalCount(),
					this.getUserFavorTeams({ token })
				]);

				if (totalRes.success && favorRes.success && listRes.success) {
					const newList = listRes.data.map((item) => {
						return favorRes.teamIdList.includes(item.teamId) ? { ...item, favor: true } : { ...item, favor: false }
					})
					result(null, {
						code: 200,
						message: '',
						success: true,
						data: {
							list: newList,
							total: totalRes.total,
						}
					});
				}

			}

		} catch (err) {
			result(err, null);
		}
	}

	getTeamDetails(params, result) {
		const { id } = params;
		if (!id) {
			return result({ code: 400, message: 'Missing teamId parameter', success: false });
		}
		try {
			sql.query(`SELECT * FROM team WHERE teamId = ?`, [id], (err, res) => {
				if (err) return result({ message: err, success: false });
				if (res.length === 0) {
					return result({ code: 404, message: 'Team not found', success: false });
				}
				result({
					code: 200,
					message: 'success',
					success: true,
					data: res[0]
				});
			});

		} catch (err) {
			result(null, err);
		}
	}
	createTeam(params, result) {
		const INSERTSQL = generateInsertSql('team', params);
		try {
			sql.query(INSERTSQL, params, (err, res) => {
				if (!err) {
					result(null, { success: true, msg: 'created success', code: 200 });
				} else {
					result({
						errorMeg: err.sqlMessage,
						success: false,
					}, null);
				}
			})
		} catch (err) {
			result(err, null);
		}
	}

	favoriteTeams(params, result) {

	}

	editTeam(params, result) {
		const { id, city, homeArena, logo, manager, partition, teamName } = params;
		let setClause = 'SET ';
		let values = [];
		if (city) {
			setClause += `city = ?, `
			values.push(city);
		}
		if (homeArena) {
			setClause += `homeArena = ?, `
			values.push(homeArena);
		}
		if (logo) {
			setClause += `logo = ?, `
			values.push(logo);
		}
		if (manager) {
			setClause += `manager = ?, `
			values.push(manager);
		}
		if (partition) {
			setClause += `\`partition\` = ?, `
			values.push(partition);
		}
		if (teamName) {
			setClause += `teamName = ?, `
			values.push(teamName);
		}
		setClause = setClause.slice(0, -2);
		// 获取当前 Unix 时间戳
		const updateTime = Math.floor(new Date().getTime() / 1000);
		setClause += `, update_time = FROM_UNIXTIME(?)`;
		values.push(updateTime);
		const SQL = `UPDATE team ${setClause} WHERE teamId = ?`;
		values.push(id);
		sql.query(SQL, values, (err) => {
			if (!err) {
				result(null, { success: true, msg: 'edit success', code: 200 });
			} else {
				result({
					errorMeg: err.sqlMessage,
					success: false,
				}, null);
			}
		})
	}
}

module.exports = TeamModel;