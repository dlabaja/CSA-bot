import {BotInit} from "../init/botInit";
import {Context} from "./context";

export class BotContext extends Context {
    public async init() {
        await new BotInit(this._appContext).init();
    }
}