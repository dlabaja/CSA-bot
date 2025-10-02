import {ApplicationContext} from "ironbean";
import {ConfigurationManager} from "../singletons/configuration-manager";
import {PathManager} from "../singletons/path-manager";

export class Init {
    protected readonly _appContext: ApplicationContext;
    
    constructor(appContext: ApplicationContext) {
        this._appContext = appContext;
    }
    
    public async init() {
        const appContext = this._appContext;
        appContext.getBean(ConfigurationManager).init();
        await appContext.getBean(PathManager).init();
    }
}