import {Events} from "discord.js";
import {onClientReady} from "../events/on-client-ready";
import {autowired, component} from "ironbean";
import {BotManager} from "./bot-manager";
import {onInteractionCreate} from "../events/on-interaction-create";

@component
export class EventManager {
    @autowired private _botManager: BotManager;
    
    public init() {
        const client = this._botManager.client;
        client.once(Events.ClientReady, onClientReady)
        client.on(Events.InteractionCreate, onInteractionCreate)
    }
}