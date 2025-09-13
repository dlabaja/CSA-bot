import {botContext} from "./src/contexts/botContext";

async function main() {
    console.log("Starting the bot...");
    await botContext.getAndInitContext();
}

main();