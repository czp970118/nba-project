const path = require('path');
const fs = require('fs').promises;
const OSS = require('ali-oss');
const { ACCESS_KEY_ID, ACCESS_KEY_SECRET } = require('../../env');

const client = new OSS({
	region: "oss-cn-beijing",
	endpoint: "oss-cn-beijing.aliyuncs.com",
	bucket: "czp-project",
	accessKeyId: ACCESS_KEY_ID,
	accessKeySecret: ACCESS_KEY_SECRET,
});

const UPLOAD_DIR = path.join(__dirname, '../../uploads');

function safeFilename(originalname) {
	const base = path.basename(originalname || 'image').replace(/[^\w.\-\u4e00-\u9fa5]/g, '_');
	return `${Date.now()}-${base || 'file'}`;
}

async function saveLocal(file, filename) {
	await fs.mkdir(UPLOAD_DIR, { recursive: true });
	const dest = path.join(UPLOAD_DIR, filename);
	await fs.writeFile(dest, file.buffer);
	const port = process.env.PORT || 8081;
	const host = process.env.UPLOAD_PUBLIC_HOST || `http://localhost:${port}`;
	const url = `${host}/uploads/${encodeURIComponent(filename)}`;
	return { url, name: filename };
}

const uploadController = async (req, res) => {
	try {
		const file = req.file;
		if (!file) {
			return res.status(400).send({ error: '没有文件被上传' });
		}
		const filename = safeFilename(file.originalname);

		try {
			const result = await client.put(filename, file.buffer);
			return res.send({ url: result.url, name: result.name });
		} catch (ossErr) {
			console.warn('[upload] OSS 不可用，已改用本地上传:', ossErr.code || ossErr.name, ossErr.message);
			const local = await saveLocal(file, filename);
			return res.send(local);
		}
	} catch (error) {
		console.error('[upload] error:', error.code || error.name, error.message);
		res.status(500).send({ error: '上传失败' });
	}
};

module.exports = uploadController;
