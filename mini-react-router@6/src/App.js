import "./style.css";
import { HashRouter, Link, Route, Routes, Navigate } from "./react-router-dom";
import { Outlet } from "./react-router/Outlet";

export default function App() {
    return (
        <HashRouter>
            <div className="link__header">
                <Link to="/home">首页</Link>
                <Link to="/home/1">首页1</Link>
                <Link to="/home/1/2">首页2</Link>
                <Link to="/about">关于</Link>
                <Link to="/list">列表</Link>
                <Link to="/navigate">重定向</Link>
            </div>
            <Routes>
                <Route path="/home" element={<Home />}>
                    <Route path="1" element={<Home1 />}>
                        <Route path="2" element={<Home2 />} />
                    </Route>
                </Route>
                <Route path="/about" element={<About />} />
                <Route path="/list" element={<List />} />
                <Route path="/notFound" element={<NotFound />} />
                <Route path="/navigate" element={<Navigate to="/notFound" />} />
            </Routes>
        </HashRouter>
    );
}

const Home = () => (
    <div>
        首页
        <Outlet />
    </div>
);
const Home1 = () => (
    <div>
        首页1
        <Outlet />
    </div>
);
const Home2 = () => (
    <div>
        首页2
        <Outlet />
    </div>
);
const About = () => <div>关于</div>;
const List = () => <div>列表</div>;
const NotFound = () => <div>404</div>;
