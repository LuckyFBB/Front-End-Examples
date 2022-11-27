import React from 'react';
import autorun from './mobx/autorun';
import { observer } from "./mobx/observe"
import { Counter, User } from './State';
@observer
class Test extends React.Component<any, any> {
    formRef: any;
    componentDidMount() {
        autorun(() => {
            console.log("autorun catch--age", this.props.currUser.user.age)
        })
    }
    handleInput = () => {
        this.props.currUser.updateName(this.formRef?.value)
    }
    render() {
        const { currUser, counter } = this.props
        return <div>
            <div>
                Current Count :{counter.count}
                <button onClick={counter.increment}>increment</button>
                <button onClick={counter.decrement}>decrement</button>
            </div>
            <br />
            <div>
                <input ref={e => this.formRef = e} placeholder="please input your name" />
                <button onClick={this.handleInput}>reset name</button>
                <div>my name: {currUser.user.name}</div>
                <div>my name length: {currUser.getNameLength}</div>
            </div>
        </div>
    }
}

function App() {
    return <Test counter={new Counter()} currUser={new User()} />
}

export default App;


