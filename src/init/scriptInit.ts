import {Init} from "./init";

export class ScriptInit extends Init {
    public async init() {
        await super.init();
        await this._init();
    }
    private async _init() {}
}