import {BotContext} from "./src/contexts/bot-context";
import {BotManager} from "./src/singletons/bot-manager";

async function main() {
    console.log("Starting the bot...");
    const context = await new BotContext().initContext();
    await context.getBean(BotManager).login();
}

main();