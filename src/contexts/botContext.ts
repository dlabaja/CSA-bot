import {
    ApplicationContext,
    Dependency,
    getBaseApplicationContext
} from "ironbean";
import {botInit} from "./botInit";

class BotContext {
    private readonly _appContext: ApplicationContext;
    
    constructor() {
        this._appContext = getBaseApplicationContext();
    }
    
    public async getAndInitContext() {
        await botInit(this._appContext);
        return this._appContext;
    }
    
    public getBean<T>(dependency: Dependency<T>) {
        return this._appContext.getBean<T>(dependency)
    }
}

export const botContext = new BotContext();
export const getBean = <T>(dependency: Dependency<T>) => botContext.getBean(dependency);