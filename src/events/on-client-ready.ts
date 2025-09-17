import {ClientEvents, Events} from "discord.js";
import {BaseEvent} from "./base-event";
import {ClientEvent} from "../decorators/client-event-decorator";
import {EventDuration} from "../data/client-event";

@ClientEvent(Events.ClientReady, EventDuration.ONCE)
export class OnClientReady extends BaseEvent<"clientReady"> {
    public callback(...args: ClientEvents["clientReady"]): void {
        const [client] = args;
        console.log("Bot started")
    }
}