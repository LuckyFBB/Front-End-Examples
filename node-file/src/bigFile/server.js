const path = require("path");
const Koa = require("koa");
const serve = require("koa-static");
const cors = require("@koa/cors");
const multer = require("@koa/multer");
const Router = require("@koa/router");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new Router();
const PORT = 8888;
// 上传后资源的URL地址
const RESOURCE_URL = `http://localhost:${PORT}`;
// 存储上传文件的目录
const UPLOAD_DIR = path.join(__dirname, "../public");

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        // 设置文件的存储目录
        cb(null, UPLOAD_DIR);
    },
    filename: async function (req, file, cb) {
        // 设置文件名
        cb(null, `${file?.originalname}`);
    },
});

app.use(bodyParser()); // 获取 formData 中除了文件别的信息

const multerUpload = multer({ storage });

router.post(
    "/uploadBig",
    async (ctx, next) => {
        try {
            await next();
            // const formData = ctx.request.body; // 获取 formData 中其他数据
            const slice = ctx.files.slice[0]; // 切片文件
            ctx.body = {
                code: 1,
                msg: "文件上传成功",
                url: `${RESOURCE_URL}/${slice.originalname}`,
            };
        } catch (error) {
            ctx.body = {
                code: 0,
                msg: "文件上传失败",
            };
        }
    },
    multerUpload.fields([{ name: "slice" }])
);

// 注册中间件
app.use(cors());
app.use(serve(UPLOAD_DIR));
app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
    console.log(`server start on: http://localhost:${PORT}/`);
});
