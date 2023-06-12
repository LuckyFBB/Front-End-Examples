const Koa = require("koa");
const path = require("path");
const Router = require("@koa/router");
const { koaBody } = require("koa-body");
const cors = require("@koa/cors");
const { pipeStream } = require("../utils/index");

const app = new Koa();
const router = new Router();

// 存储上传文件的目录
const UPLOAD_DIR = path.join(__dirname, "../public");

app.use(
    koaBody({
        multipart: true, // 支持文件上传
        formidable: {
            multipart: true, // 是否支持 multipart-formdata 的表单
        },
    })
);

router.post("/uploadSingle", (ctx) => {
    try {
        const file = ctx.request.files.file; // 当前的文件
        const filePath = path.join(UPLOAD_DIR, `/${file.originalFilename}`);
        pipeStream(file.filepath, filePath);
        ctx.body = {
            url: filePath,
            code: 0,
            message: "上传成功",
        };
    } catch (error) {
        ctx.body = {
            code: 1,
            message: "上传失败",
        };
    }
});

app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

app.listen(8888, () => {
    console.log("server is listen in 8888");
});
