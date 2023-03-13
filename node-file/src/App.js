import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { SingleFile } from "./singleFile";
import { MultiFile } from "./multiFile";
import { DirectoryFile } from "./directoryFile";
import { Menu, Layout } from "antd";
import "antd/dist/reset.css";
import "./style.css";

const { Content, Sider } = Layout;

const items = [
    {
        key: "singleFile",
        label: "SingleFile",
    },
    {
        key: "multiFile",
        label: "MultiFile",
    },
    {
        key: "directoryFile",
        label: "DirectoryFile",
    },
];

const App = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeKey, setActiveKey] = useState("");

    useEffect(() => {
        const path = location.pathname.slice(1);
        setActiveKey(path || "singleFile");
    }, []);

    return (
        <Layout>
            <Sider>
                <Menu
                    selectedKeys={[activeKey]}
                    mode="inline"
                    theme="dark"
                    items={items}
                    onClick={({ key }) => {
                        navigate(key);
                        setActiveKey(key);
                    }}
                />
            </Sider>
            <Layout style={{ padding: 16 }}>
                <Content>
                    <Routes>
                        <Route path="/" element={<SingleFile />} />
                        <Route path="/singleFile" element={<SingleFile />} />
                        <Route path="/multiFile" element={<MultiFile />} />
                        <Route
                            path="/directoryFile"
                            element={<DirectoryFile />}
                        />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};
export default App;
