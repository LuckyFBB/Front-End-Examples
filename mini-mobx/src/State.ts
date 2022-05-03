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


export class Name {
    // @ts-ignore
    @observable name = "FBB"
    @computed get getNameLength() {
        return this.name.length
    }
    updateName = (value: string) => {
        console.log(value)
        this.name = value
    }
}