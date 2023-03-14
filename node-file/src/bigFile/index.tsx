import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, UploadProps } from "antd";
import React, { useState } from "react";
import { PORT } from "../http";
import axios from "axios";
import { RcFile } from "antd/es/upload";

const request = axios.create({
    baseURL: `http://localhost:${PORT}/`,
    timeout: 60000,
});

const BIG_FILE_SIZE = 25 * 1024 * 1024;
const SLICE_FILE_SIZE = 5 * 1024 * 1024;

export const BigFile = () => {
    const [fileList, setFileList] = useState<RcFile[]>([]);

    const props: UploadProps = {
        beforeUpload: (file: any) => {
            setFileList([...fileList, file]);
            return false;
        },
        onRemove: (file) => {
            setFileList(fileList.filter(({ uid }: any) => file.uid !== uid));
        },
        fileList,
        accept: "mp3/*",
    };
    const uploadFile = () => {
        if (!fileList?.length) return alert("请选择文件");
        const file = fileList[0];
        if (file.size > BIG_FILE_SIZE) {
            // big handle
            const sliceList = getSliceList(file);
            console.log("sliceList---", sliceList);
            uploadSlice(sliceList);
        }
        // // normal handle
        // upload("/uploadSingle", file);
    };

    const getSliceList = (file: RcFile) => {
        const sliceList = [];
        let curSize = 0;
        let index = 0;
        while (curSize < file.size) {
            sliceList.push({
                slice: file.slice(curSize, (curSize += SLICE_FILE_SIZE)),
                name: file.name,
                sliceName: `${file.name}-${index}`,
            });
            index++;
        }
        return sliceList;
    };

    const uploadSlice = async (list: any) => {
        const requestList = list
            .map(({ slice, sliceName, name }: any, index: number) => {
                const formData = new FormData();
                formData.append("slice", slice);
                formData.append("sliceName", sliceName);
                formData.append("name", name);
                formData.set("file", slice);
                return { formData, index, sliceName };
            })
            .forEach(({ formData }: any) => {
                request.post("/uploadBig", formData, {
                    // 监听上传进度
                    onUploadProgress: function (progressEvent: any) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        console.log(percentCompleted);
                    },
                });
            });
        await Promise.all(requestList);
    };

    return (
        <div>
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>上传文件</Button>
            </Upload>
            <Button onClick={uploadFile}>提交文件</Button>
        </div>
    );
};
