import React, { useState } from "react";
import { Upload, message, Button } from "antd";
import type { UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { request } from "../utils/http";

export const MultiFile = () => {
    const [fileList, setFileList] = useState<any>([]);

    const uploadFile = () => {
        if (!fileList?.length) return message.error("请选择文件");
        upload("/uploadMulti", fileList);
    };

    const upload = (url: string, files: any, fieldName = "file") => {
        let formData = new FormData();
        Array.from(files).forEach((file: any) => {
            formData.append(fieldName, file);
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
        beforeUpload: (file: any) => {
            setFileList([...fileList, file]);
            return false;
        },
        onRemove: (file) => {
            setFileList(fileList.filter(({ uid }: any) => file.uid !== uid));
        },
        fileList,
        accept: ".JPG",
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
