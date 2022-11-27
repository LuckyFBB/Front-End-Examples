class DependenceManager {
    _store: any = {};
    static Dep: any;
    static Target: any;
    beginCollect(handler: () => void, target?: any) {
        DependenceManager.Dep = handler;
        DependenceManager.Target = target;
    }
    collect(id: string) {
        if (DependenceManager.Dep) {
            this._store[id] = this._store[id] || {};
            this._store[id].target =
                DependenceManager.Target || this._store[id].target;
            this._store[id].watchers = this._store[id].watchers || [];
            if (!this._store[id].watchers.includes(DependenceManager.Dep))
                this._store[id].watchers.push(DependenceManager.Dep);
        }
    }
    notify(id: string) {
        const store = this._store[id];
        if (store && store.watchers) {
            store.watchers.forEach((watch: () => void) => {
                watch.call(store.target || this);
            });
        }
    }
    endCollect() {
        DependenceManager.Dep = null;
        DependenceManager.Target = null;
    }
}

export default new DependenceManager();
