import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Progress, Row, Upload, UploadProps, message } from "antd";
import React, { useState } from "react";
import { request } from "../utils/http";
import { RcFile, UploadFile } from "antd/es/upload";
import { AxiosProgressEvent } from "axios";
import { clone } from "lodash";
import shortid from "shortid";
import SparkMD5 from "spark-md5";

const BIG_FILE_SIZE = 25 * 1024 * 1024;
const SLICE_FILE_SIZE = 5 * 1024 * 1024;

interface ISlice {
    id: string;
    slice: File;
    name: string;
    sliceName: string;
    progress?: number;
}

export const BigFile = () => {
    const [fileList, setFileList] = useState<RcFile[]>([]);
    const [sliceList, setSliceList] = useState<ISlice[]>([]);
    const [totalProgress, setTotalProgress] = useState<number>(0);
    const [md5, setMD5] = useState<string>("");

    const props: UploadProps = {
        beforeUpload: (file: RcFile) => {
            setFileList([...fileList, file]);
            return false;
        },
        onRemove: (file: UploadFile) => {
            setFileList(fileList.filter(({ uid }: any) => file.uid !== uid));
            setSliceList([]);
            setTotalProgress(0);
        },
        fileList,
    };
    const uploadFile = async () => {
        if (!fileList?.length) return alert("请选择文件");
        const file = fileList[0];
        calculateMD5(file)
            .then(async (md5) => {
                const md5Name = (md5 as string) + "." + file.name.split(".")[1];
                setMD5(md5Name);
                const shouldUpload = await verifyUpload(md5Name);
                if (!shouldUpload)
                    return message.success("文件已存在，上传成功");
                if (file.size > BIG_FILE_SIZE) {
                    // big handle
                    getSliceList(file);
                }
                // normal handle
                const formData = new FormData();
                formData.set("file", file);
                formData.set("name", md5Name);
                request.post("/uploadSingle", formData);
            })
            .catch(() => message.error("获取 MD5 之失败"));
    };

    const calculateMD5 = (file: any) =>
        new Promise((resolve, reject) => {
            const chunkSize = SLICE_FILE_SIZE;
            const fileReader = new FileReader();
            const spark = new SparkMD5.ArrayBuffer();
            let cursor = 0;
            fileReader.onerror = () => {
                reject(new Error("Error reading file"));
            };
            fileReader.onload = (e: any) => {
                spark.append(e.target.result);
                cursor += e.target.result.byteLength;
                if (cursor < file.size) loadNext();
                else resolve(spark.end());
            };
            const loadNext = () => {
                const fileSlice = file.slice(cursor, cursor + chunkSize);
                fileReader.readAsArrayBuffer(fileSlice);
            };
            loadNext();
        });

    const getSliceList = (file: RcFile) => {
        const sliceList: ISlice[] = [];
        let curSize = 0;
        let index = 0;
        while (curSize < file.size) {
            sliceList.push({
                id: shortid.generate(),
                slice: new File(
                    [file.slice(curSize, (curSize += SLICE_FILE_SIZE))],
                    `${md5}`
                ),
                name: md5,
                sliceName: `${md5}-${index}`,
                progress: 0,
            });
            index++;
        }
        uploadSlice(sliceList);
        setSliceList(sliceList);
    };

    const uploadSlice = async (sliceList: ISlice[]) => {
        const requestList = sliceList
            .map(({ slice, sliceName, name }: ISlice, index: number) => {
                const formData = new FormData();
                formData.append("slice", slice);
                formData.append("sliceName", sliceName);
                formData.append("name", name);
                return { formData, index, sliceName };
            })
            .map(({ formData }: { formData: FormData }, index: number) =>
                request.post("/uploadBig", formData, {
                    onUploadProgress: (progressEvent: AxiosProgressEvent) =>
                        sliceUploadProgress(progressEvent, index),
                })
            );
        await Promise.all(requestList);
        // 合并分片
        mergeSlice();
    };

    const sliceUploadProgress = (e: AxiosProgressEvent, index: number) => {
        const percentCompleted = Math.round(
            (e.loaded * 100) / (e.total as number)
        );
        setSliceList((preState) => {
            const newSliceList = clone(preState);

            newSliceList[index] = {
                ...newSliceList[index],
                progress: percentCompleted,
            };
            newSliceList.length &&
                setTotalProgress(
                    newSliceList
                        .map((item) => item.progress || 0)
                        .reduce((prev, curr) => prev + curr)
                );
            return newSliceList;
        });
    };

    const mergeSlice = () => {
        request.post("/mergeSlice", {
            size: SLICE_FILE_SIZE,
            name: md5,
        });
    };

    const verifyUpload = async (name: string) => {
        const res = await request.post("/verify", { name });
        return res?.data?.data;
    };

    return (
        <>
            <Row>
                <Upload {...props}>
                    <Button
                        icon={<UploadOutlined />}
                        disabled={fileList.length === 1}
                    >
                        上传文件
                    </Button>
                </Upload>
                <Button onClick={uploadFile}>提交文件</Button>
            </Row>
            <br />
            {!!sliceList.length && (
                <Row gutter={[32, 0]}>
                    <Col span={12}>
                        总进度
                        <Progress percent={totalProgress} />
                    </Col>

                    <Col span={12}>
                        切片进度
                        {sliceList.map((item, index) => (
                            <Row gutter={[16, 16]} align="middle" key={item.id}>
                                <Col span={6}>
                                    {fileList[0].name}-{index}:
                                </Col>
                                <Col span={18}>
                                    <Progress percent={item.progress} />
                                </Col>
                            </Row>
                        ))}
                    </Col>
                </Row>
            )}
        </>
    );
};
