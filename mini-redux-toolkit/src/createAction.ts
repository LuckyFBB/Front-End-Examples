export const createAction = (type: string, preAction?: Function) => {
    return function (...args: any[]) {
        if (preAction) {
            const prepared = preAction(...args);
            if (!prepared) {
                throw new Error("prepareAction did not return an object");
            }
            return {
                type,
                payload: prepared.payload,
            };
        }
        return {
            type,
            payload: args[0],
        };
    };
};
