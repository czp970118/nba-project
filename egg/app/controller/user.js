const { Controller } = require('egg');

class UserController extends Controller {
	async getUserInfo() {
		const ctx = this.ctx;
		const userId = ctx.query.userId;
		const userInfo = await this.ctx.service.user.findOne(userId);
		ctx.body = userInfo;
	}

	async userLogin() {
		const ctx = this.ctx;
		const { userName, userPassword } = ctx.request.body;
		try {
			const res = await this.ctx.service.user.login({ userName, userPassword });
			ctx.body = res;
		} catch (error) {
			ctx.body = {
				success: false,
				message: error.message,
			};
		}
	}

	async userEdit() {
		const ctx = this.ctx;
		const params = ctx.request.body;
		try {
			const res = await this.ctx.service.user.edit(params);
			ctx.body = res;
		} catch (error) {
			ctx.body = {
				success: false,
				message: error.message,
			};
		}
	}

	async getUserFavorTeams() {
		const ctx = this.ctx;
		const token = ctx.query.token;
		const res = await this.ctx.service.user.getUserFavorTeams(token);
		ctx.body = res;
	}

	async favoriteTeams() {
		const ctx = this.ctx;
		const res = await ctx.service.user.favoriteTeams();
		ctx.body = res;
	}
}

module.exports = UserController;