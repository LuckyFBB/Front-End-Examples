// fs 基础版本

const path = require("path");
const fs = require("fs");
const Koa = require("koa");
const cors = require("@koa/cors");
const Router = require("@koa/router");
const { koaBody } = require("koa-body");
const { pipeStream, pipeStreamRemove } = require("../utils");

const PORT = 8888;
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

const mergeSlice = async (filePath, sliceDir, size) => {
    if (!fs.existsSync(sliceDir)) {
        throw new Error("当前文件不存在");
    }
    const slices = await fs.readdirSync(sliceDir);
    slices.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
    try {
        const slicesPipe = slices.map((sliceName, index) => {
            return pipeStreamRemove(
                path.resolve(sliceDir, sliceName),
                fs.createWriteStream(filePath, { start: index * size })
            );
        });
        await Promise.all(slicesPipe);
        await fs.rmdirSync(sliceDir);
    } catch (error) {
        console.log(error);
    }
};

router.post("/uploadSingle", (ctx) => {
    try {
        const file = ctx.request.files.file; // 当前的文件
        const { name } = ctx.request.body;
        const filePath = path.join(UPLOAD_DIR, `/${name}`);
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

router.post("/uploadBig", async (ctx) => {
    try {
        const slice = ctx.request.files.slice;
        const { sliceName, name } = ctx.request.body;
        const slice_dir = path.join(
            UPLOAD_DIR,
            `${name.split(".")?.[0]}-slice`
        );
        const filePath = path.join(slice_dir, sliceName);
        if (!fs.existsSync(slice_dir)) {
            await fs.mkdirSync(slice_dir);
        }
        await pipeStream(slice.filepath, filePath);
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

router.post("/mergeSlice", async (ctx, next) => {
    try {
        const { size, name } = ctx.request.body ?? {};
        const sliceName = name.split(".")?.[0];
        const filePath = path.join(UPLOAD_DIR, name);
        const slice_dir = path.join(UPLOAD_DIR, `${sliceName}-slice`);
        await mergeSlice(filePath, slice_dir, size);
        ctx.body = {
            code: 1,
            msg: "文件合并成功",
        };
    } catch (error) {
        ctx.body = {
            code: 0,
            msg: "文件合并失败",
        };
    }
});

router.post("/verify", async (ctx, next) => {
    try {
        const { name } = ctx.request.body ?? {};
        const filePath = path.resolve(UPLOAD_DIR, name);
        if (fs.existsSync(filePath)) {
            ctx.body = {
                code: 1,
                data: false,
            };
        } else {
            ctx.body = {
                code: 1,
                data: true,
            };
        }
    } catch (error) {
        ctx.body = {
            code: 0,
            msg: "检测失败",
        };
    }
});

// 注册中间件
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
    console.log(`server start on: http://localhost:${PORT}/`);
});
