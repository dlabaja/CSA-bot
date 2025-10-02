import {BaseContext} from "./base-context";
import {ScriptInit} from "../init/script-init";

export class ScriptContext extends BaseContext {
    protected async init() {
        await new ScriptInit(this._appContext).init();
    }
}