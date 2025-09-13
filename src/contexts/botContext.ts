import {
    ApplicationContext,
    Dependency,
    getBaseApplicationContext
} from "ironbean";
import {Configuration} from "../singletons/configuration";
import {Logging} from "../singletons/logging";
import {botInit} from "./botInit";

class BotContext {
    private readonly _appContext: ApplicationContext;
    
    constructor() {
        this._appContext = getBaseApplicationContext();
    }
    
    public init() {
        botInit(this._appContext)
    }
    
    public getBean<T>(dependency: Dependency<T>) {
        return this._appContext.getBean<T>(dependency)
    }
}

export const botContext = new BotContext();
export const getBean = <T>(dependency: Dependency<T>) => botContext.getBean(dependency);