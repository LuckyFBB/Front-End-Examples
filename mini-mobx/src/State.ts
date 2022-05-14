import { computed } from "./mobx/computed";
import { observable } from "./mobx/observable"

export class Counter {
    // @ts-ignore
    @observable
    count = 0
    increment = () => {
        this.count++;
    }
    decrement = () => {
        this.count--;
    }
}


export class User {
    // @ts-ignore
    @observable user = { name: "FBB", age: 20 }
    @computed get getNameLength() {
        return this.user.name.length
    }
    updateName = (value: string) => {
        this.user.name = value
    }
}