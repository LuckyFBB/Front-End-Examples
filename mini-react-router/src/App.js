import "./style.css";
import { HashRouter, Link } from "./react-router-dom"
import { Route, Switch, Redirect } from "./react-router"

export default function App() {
    return (
        <HashRouter>
            <div>
                <Link to="/home">首页</Link>
                <Link to="/home/1">首页1</Link>
                <Link to="/about">关于</Link>
                <Link to="/list">列表</Link>
            </div>
            <Switch>
                <Route path="/home" component={Home}></Route>
                <Route path="/home/1" component={Home1}></Route>
                <Route path="/about" component={About}></Route>
                <Route path="/list" component={List}></Route>
                <Route path="/notFound" component={NotFound} />
                <Route path="/a" render={() => <Redirect to="/notFound" />} />
            </Switch>
        </HashRouter>
    );
}

const Home = () => <div>首页</div>;
const Home1 = () => <div>首页1</div>;
const About = () => <div>关于</div>;
const List = () => <div>列表</div>;
const NotFound = () => <div>404</div>;
