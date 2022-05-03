import React, { useEffect, useRef } from 'react';
import autorun from './mobx/autorun';
import { observer } from "./mobx/observe"
import { Counter, Name } from './State';

function TestContainer({ counter, name }: any) {
    let formRef = useRef() as any
    useEffect(() => {
        autorun(() => {
            console.log("count----", counter.count)
        })
        autorun(() => {
            console.log("getNameLength----", name.getNameLength)
        })
    }, [])
    const handleInput = () => {
        name.updateName(formRef.current.value)
    }
    return <div>
        <div>
            Current Count :{counter.count}
            <button onClick={counter.increment}>increment</button>
            <button onClick={counter.decrement}>decrement</button>
        </div>
        <div>
            <input ref={formRef} />
            <p>input length: {name.getNameLength}</p>
            <button onClick={handleInput}>handleInput</button>
        </div>
    </div>
}

@observer
class Test extends React.Component<any, any> {
    formRef: any;
    handleInput = () => {
        this.props.name.updateName(this.formRef?.value)
    }
    render() {
        const { name } = this.props
        return <div>
            <input ref={e => this.formRef = e} />
            <p>input length: {name.getNameLength}</p>
            <button onClick={this.handleInput}>handleInput</button>
        </div>
    }
}

function App() {
    // return <TestContainer counter={new Counter()} name={new Name()} />
    return <Test counter={new Counter()} name={new Name()} />
}

export default App;


