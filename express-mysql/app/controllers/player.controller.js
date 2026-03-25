const PlayerModel = require('../models/play.model.js');

const getAllPlayers = function (req, res) {
	const params = req.query;
	PlayerModel.getAllPlayers(params, (err, result) => {
		if (err) {
			res.send(err);
		} else {
			res.send(result);
		}
	});
};

const getPlayerById = function (req, res) {
	PlayerModel.getPlayerById(req.query, (err, result) => {
		if (err) {
			res.send(err);
		} else {
			res.send(result);
		}
	});
};

const createPlayer = function (req, res) {
	const body = req.body;
	const { teamId, number, position, age, introduction, name, capability, avatar } = body;
	const positionStr = Array.isArray(position) ? position.join(',') : position || '';
	PlayerModel.createPlyer(
		{
			name,
			teamId,
			age,
			number,
			position: positionStr,
			capability,
			introduction,
			avatar,
		},
		(err, result) => {
			if (err) {
				res.send(err);
			} else {
				res.send(result);
			}
		}
	);
};

const updatePlayer = function (req, res) {
	const body = req.body;
	const { id, position, ...rest } = body;
	const params = { ...rest };
	if (position !== undefined) {
		params.position = Array.isArray(position) ? position.join(',') : position;
	}
	PlayerModel.updatePlayerById(id, params, (err, result) => {
		if (err) {
			res.send(err);
		} else {
			res.send(result);
		}
	});
};

const removePlayerFromTeam = function (req, res) {
	const { id } = req.body;
	PlayerModel.updatePlayerById(id, { teamId: null }, (err, result) => {
		if (err) {
			res.send(err);
		} else {
			res.send(result);
		}
	});
};

module.exports = {
	getAllPlayers,
	getPlayerById,
	createPlayer,
	updatePlayer,
	removePlayerFromTeam,
};
