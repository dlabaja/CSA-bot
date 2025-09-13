import {botContext, getBean} from "./contexts/botContext";

export function initBot() {
    botContext.init();
    console.log("Starting the bot...");
}