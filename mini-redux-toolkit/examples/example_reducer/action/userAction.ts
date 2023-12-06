import { createAction } from "@reduxjs/toolkit";

// const updateName = createAction("user/UPDATE_NAME", (name: string) => ({
//     payload: {
//         name,
//     },
// }));
// const updateAge = createAction("user/UPDATE_AGE", (age: number) => ({
//     payload: {
//         age,
//     },
// }));

const updateName = createAction<{ name: string }>("user/UPDATE_NAME");
const updateAge = createAction<{ age: number }>("user/UPDATE_AGE");

export { updateName, updateAge };
