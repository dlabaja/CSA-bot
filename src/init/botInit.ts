import {LoggingManager} from "../singletons/logging-manager";
import {EventManager} from "../singletons/event-manager";
import {Init} from "./init";

export class BotInit extends Init {
    public async init() {
        await super.init();
        await this._init();
    }
    
    private async _init() {
        const appContext = this._appContext;
        const logging = appContext.getBean(LoggingManager);
        logging.init(5);
        logging.remapToConsole();

        appContext.getBean(EventManager).init();
    }
}