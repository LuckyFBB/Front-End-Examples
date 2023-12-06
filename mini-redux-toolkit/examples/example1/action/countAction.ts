import { createAction } from "@reduxjs/toolkit";

const increment = createAction('counter/increment')
const decrement = createAction('counter/decrement')

export { increment, decrement };
