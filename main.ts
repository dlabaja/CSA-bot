import {BotContext} from "./src/contexts/botContext";
import {context, initContext} from "./src/contexts/context";
import {BotManager} from "./src/singletons/bot-manager";

async function main() {
    console.log("Starting the bot...");
    await initContext(new BotContext());
    await context.getBean(BotManager).login();
}

main();