export class Subscription {
  constructor(store, parentSub) {
    this.store = store;
    this.parentSub = parentSub;
    this.listeners = [];
    this.onStateChange = null;
    this.handleChangeWrapper = this.handleChangeWrapper.bind(this);
  }
  //当前组件注册
  addNestedSub(listener) {
    this.listeners.push(listener);
  }
  //通知监听者
  notifyNestedSubs() {
    this.listeners.forEach((listener) => listener());
  }

  // 回调函数的包装
  handleChangeWrapper() {
    if (this.onStateChange) {
      this.onStateChange();
    }
  }

  //注册回调函数
  //如果没有parentSub，说明是根组件注册到store上
  //如果有，就注册到父组件的监听类上
  trySubscribe() {
    this.parentSub
      ? this.parentSub.addNestedSub(this.handleChangeWrapper)
      : this.store.subscribe(this.handleChangeWrapper);
  }
}
