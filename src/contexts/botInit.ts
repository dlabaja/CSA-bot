import {ApplicationContext} from "ironbean";
import {ConfigurationManager} from "../singletons/configuration-manager";
import {LoggingManager} from "../singletons/logging-manager";
import {BotManager} from "../singletons/bot-manager";
import {EventManager} from "../singletons/event-manager";
import {PathManager} from "../singletons/path-manager";

export async function botInit(appContext: ApplicationContext) {
    appContext.getBean(ConfigurationManager).init();
    
    const logging = appContext.getBean(LoggingManager);
    logging.init(5);
    logging.remapToConsole();

    await appContext.getBean(BotManager).init();
    await appContext.getBean(PathManager).init();
    appContext.getBean(EventManager).init();
}