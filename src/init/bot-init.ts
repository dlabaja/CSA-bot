import {LoggingManager} from "../singletons/logging-manager";
import {EventManager} from "../singletons/event-manager";
import {BaseInit} from "./base-init";
import {DecoratorManager} from "../singletons/decorator-manager";

export class BotInit extends BaseInit {
    public async init() {
        await super.init();
        await this._init();
    }
    
    private async _init() {
        const appContext = this._appContext;

        const logging = appContext.getBean(LoggingManager);
        logging.init(5);
        logging.remapToConsole();

        await appContext.getBean(DecoratorManager).init();

        appContext.getBean(EventManager).init();
    }
}