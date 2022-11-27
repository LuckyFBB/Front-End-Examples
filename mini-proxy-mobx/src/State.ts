import { computed } from "./mobx/computed";
import { observable } from "./mobx/observable";

export class User {
    // @ts-ignore
    user = observable({ name: "FBB", age: 20 });
    @computed get getNameLength() {
        return this.user.name.length;
    }
    updateName = (value: string) => {
        this.user.name = value;
    };
}
