const OSS = require('ali-oss');
const { ACCESS_KEY_ID, ACCESS_KEY_SECRET } = require('../../env');
const client = new OSS({
	region: "oss-cn-beijing",
	endpoint: "oss-cn-beijing.aliyuncs.com",
	bucket: "czp-project",
	accessKeyId: ACCESS_KEY_ID,
	accessKeySecret: ACCESS_KEY_SECRET,
});

async function generateSignedUrl(url) {
	try {
		// 这里设置URL的有效期为1小时（3600秒）
		const signedUrl = await client.signatureUrl(url, { expires: 3600 });
		return signedUrl;
	} catch (error) {
		console.error('Failed to generate signed URL:', error);
		throw error;
	}
}
const uploadController = async (req, res) => {
	try {
		// 这里将处理上传到OSS的逻辑
		const file = req.file;
		if (!file) {
			return res.status(400).send({ error: '没有文件被上传' });
		}
		// 上传文件到OSS
		const result = await client.put(`${Date.now()}-${file.originalname}`, file.buffer);
		res.send({ url: result.url, name: result.name }); // 返回文件的URL
	} catch (error) {
		console.error('[upload] OSS error:', error.code || error.name, error.message);
		res.status(500).send({ error: '上传失败' });
	}
}

module.exports = uploadController;

