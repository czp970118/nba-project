const User = require('../models/user.model.js');
const { Permissions } = require('../../constan.js');


exports.login = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!"
		})
	}
	const { userName, userPassword } = req.body;
	User.login({ userName, userPassword }, (err, data) => {
		if (err) {
			res.status(404).send({
				message: '用户名或密码错误!'
			});
		} else {
			res.send(data);
		}
	})
}

exports.register = (req, res) => {
	const { userName, userPassword } = req.body;
	User.register({ userName, userPassword }, (err, data) => {
		if (err) {
			res.status(404).send({})
		} else {
			res.send(data);
		}
	})
}

exports.getUserInfo = (req, res) => {
	const { userName } = req.query;
	User.getUserInfo(userName, (result, error) => {
		if (error) {
			res.status(404).send({})
		} else {
			const { role, userName, avatar, id, } = result
			const permissions = Permissions[role];
			res.send({ success: true, message: '', user: { role, userName, avatar, id, permissions } });
		}
	})
}