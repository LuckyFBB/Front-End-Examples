const path = require("path");
const fs = require("fs");
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
        const name = file?.originalname.split(".")?.[0];
        const SLICE_DIR = path.join(UPLOAD_DIR, `${name}-slice`);
        if (!fs.existsSync(SLICE_DIR)) {
            await fs.mkdirSync(SLICE_DIR);
        }
        // 设置文件的存储目录
        cb(null, SLICE_DIR);
    },
    filename: async function (req, file, cb) {
        // 设置文件名
        cb(null, `${file?.originalname}`);
    },
});

app.use(bodyParser()); // 获取 formData 中除了文件别的信息

const multerUpload = multer({ storage });

const pipeStream = (path, writeStream) => {
    return new Promise((resolve) => {
        const readStream = fs.createReadStream(path);
        readStream.on("end", () => {
            fs.unlinkSync(path);
            resolve();
        });
        readStream.pipe(writeStream);
    });
};

const mergeSlice = async (filePath, sliceDir, size) => {
    if (!fs.existsSync(sliceDir)) {
        throw new Error("当前文件不存在");
    }
    const slices = await fs.readdirSync(sliceDir);
    slices.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
    try {
        const slicesPipe = slices.map((sliceName, index) => {
            return pipeStream(
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

router.post("/mergeSlice", async (ctx, next) => {
    try {
        await next();
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
        await next();
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
app.use(serve(UPLOAD_DIR));
app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
    console.log(`server start on: http://localhost:${PORT}/`);
});
