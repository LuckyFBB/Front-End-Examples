import { produce as createNextState } from "immer";

export const createReducer = (
    initialState: any,
    builderCallback: (builder: any) => void
) => {
    const actionsMap = executeReducerBuilderCallback(builderCallback);
    return function reducer(state = initialState, action: any) {
        const caseReducer = actionsMap[action.type];
        if (!caseReducer) return state;
        return createNextState(state, (draft: any) =>
            caseReducer(draft, action)
        );
    };
};

export const executeReducerBuilderCallback = (
    builderCallback: (builder: any) => void
) => {
    const actionsMap: any = {};
    const builder = {
        addCase(typeOrActionCreator: any, reducer: any) {
            const type =
                typeof typeOrActionCreator === "string"
                    ? typeOrActionCreator
                    : typeOrActionCreator.type;
            actionsMap[type] = reducer;
            return builder;
        },
    };
    builderCallback(builder);
    return actionsMap;
};
