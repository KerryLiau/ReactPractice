type SchedulerCallback<T> = (self: T, ...args: unknown[]) => void;

class SingletonScheduler<T> {
    private isValid: boolean;
    private _isRunning: boolean;
    private schedulerId: NodeJS.Timer | null;
    private callBack: SchedulerCallback<T>;
    private interval: number;
    private self: T;
    private args: unknown[];

    /**
     * @param callBack what this scheduler suppose to do
     * @param interval time interval (in millisecond)
     * @param self 'this'
     * @param args time interval (in millisecond)
     */
    public static newInstance<T>(self: T, callBack: SchedulerCallback<T>, interval: number, ...args: unknown[]): SingletonScheduler<T> | null {
        const instance = new SingletonScheduler<T>();
        instance.isValid = instance.checkCallBack(callBack);
        if (!instance.isValid) return null;
        instance._isRunning = false;
        instance.callBack = callBack;
        instance.interval = interval;
        instance.self = self;
        instance.args = args;
        return instance;
    }

    private checkCallBack(callBack: SchedulerCallback<T>): boolean {
        const funcStr = callBack.toString();
        if (funcStr.indexOf("this") > 0) {
            console.error("call back must not have 'this' key word");
            return false;
        }
        return true;
    }

    public isRunning(): boolean {
        return this._isRunning;
    }

    public start(): void {
        if (!this.isValid) return;
        this.stopIfExist();
        this.schedulerId = setInterval(() => this.callBack(this.self, ...this.args), this.interval);
        this._isRunning = true;
    }

    private stopIfExist():void {
        if (this.schedulerId == null) return;
        clearInterval(this.schedulerId);
        this._isRunning = false;
    }

    public stop(): void {
        this.stopIfExist();
    }
}

export {SingletonScheduler};