import {ClientEvents} from "discord.js";

export abstract class BaseEvent<E extends keyof ClientEvents> {
    public abstract callback(...args: ClientEvents[E]): void;
}