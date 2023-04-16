import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Progress, Row, Upload, UploadProps } from "antd";
import React, { useState } from "react";
import { request } from "../http";
import { RcFile, UploadFile } from "antd/es/upload";
import { AxiosProgressEvent } from "axios";
import { clone } from "lodash";

const BIG_FILE_SIZE = 25 * 1024 * 1024;
const SLICE_FILE_SIZE = 5 * 1024 * 1024;

interface ISlice {
    slice: File;
    name: string;
    sliceName: string;
    progress?: number;
}

export const BigFile = () => {
    const [fileList, setFileList] = useState<RcFile[]>([]);
    const [sliceList, setSliceList] = useState<ISlice[]>([]);
    const [totalProgress, setTotalProgress] = useState<number>(0);

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
        accept: "mp3/*",
    };
    const uploadFile = async () => {
        if (!fileList?.length) return alert("请选择文件");
        const file = fileList[0];
        if (file.size > BIG_FILE_SIZE) {
            // big handle
            getSliceList(file);
        }
        // // normal handle
        // upload("/uploadSingle", file);
    };

    const getSliceList = (file: RcFile) => {
        const sliceList: ISlice[] = [];
        let curSize = 0;
        let index = 0;
        while (curSize < file.size) {
            sliceList.push({
                slice: new File(
                    [file.slice(curSize, (curSize += SLICE_FILE_SIZE))],
                    `${file.name}-${index}`
                ),
                name: file.name,
                sliceName: `${file.name}-${index}`,
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
                        {sliceList.map((item) => (
                            <Row gutter={[16, 16]} align="middle">
                                <Col span={6}>{item.sliceName}:</Col>
                                <Col span={18}>
                                    <Progress
                                        percent={item.progress}
                                        key={item.sliceName}
                                    />
                                </Col>
                            </Row>
                        ))}
                    </Col>
                </Row>
            )}
        </>
    );
};
