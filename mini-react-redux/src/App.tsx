import ShowUser from "./ShowUser";
import { createStore } from "redux";
import rootReducer from "./reducer";
import { Provider } from "./react-redux";

export default function App() {
    const store = createStore(rootReducer);
    return (
        <Provider store={store}>
            <ShowUser />
        </Provider>
    );
}