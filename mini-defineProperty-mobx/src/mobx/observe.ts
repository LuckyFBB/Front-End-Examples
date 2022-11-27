import autorun from "./autorun";

export function observer(target: any) {
    const componentDidMount = target.prototype.componentDidMount;
    target.prototype.componentDidMount = function () {
        componentDidMount && componentDidMount.call(this);
        autorun(() => {
            this.render();
            this.forceUpdate();
        });
    };
}
