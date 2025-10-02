import {ApplicationContext, Dependency, getBaseApplicationContext} from "ironbean";

export abstract class BaseContext {
    protected readonly _appContext: ApplicationContext;
    private _initialized: boolean;

    constructor() {
        this._appContext = getBaseApplicationContext();
    }

    public async initContext(): Promise<BaseContext> {
        if (this._initialized) {
            return this;
        }
        await this.init();
        this._initialized = true;
        return this;
    }
    
    protected abstract init(): Promise<void>;

    public getBean<T>(dependency: Dependency<T>) {
        return this._appContext.getBean<T>(dependency)
    }
}