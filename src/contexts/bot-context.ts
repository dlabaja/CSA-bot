import {BotInit} from "../init/bot-init";
import {BaseContext} from "./base-context";

export class BotContext extends BaseContext {
    protected async init() {
        await new BotInit(this._appContext).init();
    }
}