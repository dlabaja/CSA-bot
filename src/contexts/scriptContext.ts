import {Context} from "./context";
import {ScriptInit} from "../init/scriptInit";

export class ScriptContext extends Context {
    protected async init() {
        await new ScriptInit(this._appContext).init();
    }
}