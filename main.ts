import {BotContext} from "./src/contexts/botContext";
import {context} from "./src/contexts/context";
import {BotManager} from "./src/singletons/bot-manager";

async function main() {
    console.log("Starting the bot...");
    await new BotContext().initContext();
    await context.getBean(BotManager).login();
}

main();