import {Context} from "./context";
import {ScriptInit} from "../init/scriptInit";

export class ScriptContext extends Context {
    public async init() {
        await new ScriptInit(this._appContext).init();
    }
}