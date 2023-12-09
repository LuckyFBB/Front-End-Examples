export const createAction = (type: string, preAction?: Function) => {
    function actionCreator(...args: any[]) {
        if (!preAction)
            return {
                type,
                payload: args[0],
            };
        const prepared = preAction(...args);
        if (!prepared) {
            throw new Error("prepareAction did not return an object");
        }
        return {
            type,
            payload: prepared.payload,
        };
    }
    actionCreator.type = type;
    return actionCreator;
};
