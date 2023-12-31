const sql = require('./db.js');
const User = function () {

};

User.login = ({ userName, userPassword }, result) => {
	sql.query('select * from user where userName=? and userPassword=?', [userName, userPassword], (err, res) => {
		if (err) {
			result(err, null);
			return;
		}
		if (res.length) {
			result(null, { success: true, msg: '', code: 200 });
		} else {
			result(null, { success: false, msg: '用户名或密码错误!', code: 450 })
		}
	})
}

User.register = async ({ userName, userPassword }, result) => {
	try {
		sql.query('select * from user where userName=?', [userName], (err, res) => {
			if (!res || res.length === 0) {
				sql.query('insert into user value (?,?,?)', [0, userName, userPassword]);
				result(null, { success: true, code: 0, msg: '注册成功!' })
			} else {
				result(null, { success: false, code: 1, msg: '用户名重复!' })
			}
		})
	} catch (err) {
		console.log('err', err);
	}
}

User.getUserInfo = async (userName, result) => {
	try {
		sql.query('select * from user where userName=?', [userName], (error, res) => {
			if (error) result(error, { success: false });
			if (res.length) {
				result(res[0], null)
			} else {
				result({ code: 1, mes: '没有此用户信息!' }, null)
			}
		})

	} catch (error) {
		console.log('error', error);
		err(error);
	}
}


module.exports = User;