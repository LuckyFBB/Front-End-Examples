const path = require("path");
const Koa = require("koa");
const serve = require("koa-static");
const cors = require("@koa/cors");
const multer = require("@koa/multer");
const Router = require("@koa/router");
const fse = require("fs-extra");

const app = new Koa();
const router = new Router();
const PORT = 3000;
// 上传后资源的URL地址
const RESOURCE_URL = `http://localhost:${PORT}`;
// 存储上传文件的目录
const UPLOAD_DIR = path.join(__dirname, "../public");

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        // 处理 @ 符号，转换为正确的地址，且根据正确的路径生成目录
        const relativePath = file.originalname.replace(/@/g, path.sep);
        const index = relativePath.lastIndexOf(path.sep);
        const fileDir = path.join(UPLOAD_DIR, relativePath.substr(0, index));
        await fse.ensureDir(fileDir);
        cb(null, fileDir);
    },
    filename: function (req, file, cb) {
        const parts = file.originalname.split("@");
        cb(null, `${parts[parts.length - 1]}`);
    },
});

const multerUpload = multer({ storage });

router.get("/", async (ctx) => {
    ctx.body = "yohe, welcome";
});

router.post(
    "/uploadDirectory",
    async (ctx, next) => {
        try {
            await next();
            const urls = ctx.files.file.map(
                (file) => `${RESOURCE_URL}/${file.originalname.replace(/\@/g, "/")}`
            );
            ctx.body = {
                code: 1,
                msg: "文件上传成功",
                urls,
            };
        } catch (error) {
            console.log(error);
            ctx.body = {
                code: 0,
                msg: "文件上传失败",
            };
        }
    },
    multerUpload.fields([{ name: "file" }])
);

// 注册中间件
app.use(cors());
app.use(serve(UPLOAD_DIR));
app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
    console.log(`server start on: http://localhost:${PORT}/`);
});
