import {BotInit} from "../init/botInit";
import {Context} from "./context";

export class BotContext extends Context {
    protected async init() {
        await new BotInit(this._appContext).init();
    }
}