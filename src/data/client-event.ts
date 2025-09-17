import {ClientEvents} from "discord.js";

export enum EventDuration {
    ONCE = "ONCE",
    ALWAYS = "ALWAYS"
}

export interface IClientEvent<E extends keyof ClientEvents> {
    event: E,
    type: EventDuration
    callback: (...args: ClientEvents[E]) => void;
}

export class ClientEvent<E extends keyof ClientEvents> {
    public event: E;
    public type: EventDuration;
    public callback: (...args: ClientEvents[E]) => void;

    constructor(settings: IClientEvent<E>) {
        this.event = settings.event;
        this.type = settings.type;
        this.callback = settings.callback;
    }
}