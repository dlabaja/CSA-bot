import {autowired, component} from "ironbean";
import {BotManager} from "./bot-manager";
import {ClientEvent, EventDuration} from "../data/client-event";
import {ClientEvents} from "discord.js";

@component
export class EventManager {
    @autowired private _botManager: BotManager;
    private readonly _clientEvents: ClientEvent<keyof ClientEvents>[];
    
    constructor() {
        this._clientEvents = [];
    }

    get clientEvents() {
        return this._clientEvents;
    }
    
    public init() {
        const client = this._botManager.client;
        this._clientEvents.forEach(e => {
            switch (e.type) {
                case EventDuration.ONCE:
                    client.once(e.event, e.callback);
                    break;
                case EventDuration.ALWAYS:
                    client.on(e.event, e.callback)
                    break;
            }
        })
    }
}