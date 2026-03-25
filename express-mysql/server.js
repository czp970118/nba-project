const path = require("path");
const express = require("express");
const multer = require('multer');
const uploadController = require('./app/controllers/uploadController')
const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 解决跨域问题
app.use("*", function (req, res, next) {
  // 设置允许跨域的域名,*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  // 允许的header类型
  res.header('Access-Control-Allow-Headers', '*');
  // 跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
  if (req.method.toLowerCase() == 'options') {
    res.send(200); // 让options 尝试请求快速结束
  }
  else
    next();
})

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

const storage = multer.memoryStorage(); // 存储在内存中，适合直接上传到OSS
const upload = multer({ storage });


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
app.post('/upload', upload.single('file'), uploadController);

require("./app/routes/user.router.js")(app);
require("./app/routes/team.router.js")(app);
require("./app/routes/player.router.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
