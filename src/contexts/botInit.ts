import {ApplicationContext} from "ironbean";
import {Configuration} from "../singletons/configuration";
import {Logging} from "../singletons/logging";

export function botInit(appContext: ApplicationContext) {
    appContext.getBean(Configuration).init();
    const logging = appContext.getBean(Logging);
    logging.init(5);
    logging.remapToConsole();
}