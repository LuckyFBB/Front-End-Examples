import React, { useState } from "react";
import { Upload, message, Button } from "antd";
import type { UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { request } from "../http";

export const DirectoryFile = () => {
    const [fileList, setFileList] = useState<any>([]);

    const uploadFile = () => {
        if (!fileList?.length) return message.error("请选择文件");
        upload("/uploadDirectory", fileList);
    };

    const upload = (url: string, files: any, fieldName = "file") => {
        let formData = new FormData();
        Array.from(files).forEach((file: any) => {
            // webkitRelativePath 相对路径，"@koa/multer" 处理文件的时候也会处理 /，所以需要在这里做一个转换，保证能够正确处理
            formData.append(
                fieldName,
                file,
                file.webkitRelativePath.replace(/\//g, "@")
            );
        });
        request.post(url, formData, {
            // 监听上传进度
            onUploadProgress: function (progressEvent: any) {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                console.log(percentCompleted);
            },
        });
    };

    const props: UploadProps = {
        beforeUpload: (_file: any, newFileList) => {
            setFileList([...fileList, ...newFileList]);
            return false;
        },
        onRemove: (file) => {
            setFileList(fileList.filter(({ uid }: any) => file.uid !== uid));
        },
        fileList,
    };

    return (
        <div>
            <Upload {...props} directory>
                <Button icon={<UploadOutlined />}>上传文件夹</Button>
            </Upload>
            <Button onClick={uploadFile}>提交文件</Button>
        </div>
    );
};
