const updateName = (name: string) => ({ type: "user/UPDATE_NAME", name });
const updateAge = (age: number) => ({ type: "user/UPDATE_AGE", age });

export { updateAge, updateName };
