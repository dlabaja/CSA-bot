import {Init} from "./init";
import {DecoratorManager} from "../singletons/decorator-manager";

export class ScriptInit extends Init {
    public async init() {
        await super.init();
        await this._init();
    }
    private async _init() {
        await this._appContext.getBean(DecoratorManager).init();
    }
}