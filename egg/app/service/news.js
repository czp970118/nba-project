const { Service } = require('egg');

class NewsService extends Service {
	async list(page = 1) {
		const { serverUrl, pageSize } = this.config.news;
		const { data: idList } = await this.ctx.curl(`${serverUrl}/topstories.json`, {
			dataType: 'json',
		});
		const ids = Array.isArray(idList) ? idList : [];
		const start = pageSize * (page - 1);
		const slice = ids.slice(start, start + pageSize);
		const newsList = await Promise.all(
			slice.map(id => this.ctx.curl(`${serverUrl}/item/${id}.json`, { dataType: 'json' }))
		);
		return newsList.map(res => res.data);
	}
}
module.exports = NewsService;