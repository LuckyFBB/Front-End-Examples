import { createAction } from "./createAction";
import { createReducer } from "./createReducer";

export default function createSlice({ name, initialState, reducers }: any) {
    const reducerNames = Object.keys(reducers);

    const actionCreators: any = {};
    const sliceCaseReducersByType: any = {};

    reducerNames.forEach((reducerName) => {
        const type = `${name}/${reducerName}`;
        const reducerWithPrepare = reducers[reducerName];
        actionCreators[reducerName] = createAction(type);
        sliceCaseReducersByType[type] = reducerWithPrepare;
    });

    function buildReducer() {
        return createReducer(initialState, (builder) => {
            for (let key in sliceCaseReducersByType) {
                builder.addCase(key, sliceCaseReducersByType[key]);
            }
        });
    }

    return {
        name,
        actions: actionCreators,
        reducer: (state: any, action: any) => {
            const _reducer = buildReducer();
            return _reducer(state, action);
        },
    };
}
