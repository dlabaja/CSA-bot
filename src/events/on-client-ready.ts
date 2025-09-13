import {ClientEvents} from "discord.js";

export function onClientReady(...props: ClientEvents["clientReady"]) {
    const [client] = props;
    console.log("Bot started")
}