import {BaseEvent} from "../events/base-event";
import {ClientEvents} from "discord.js";
import {ClientEvent as ClientEventData, EventDuration} from "../data/client-event";
import {autowired} from "ironbean";
import {EventManager} from "../singletons/event-manager";

type ClientEventArgs = [event: keyof ClientEvents, duration: EventDuration]
type ConcreteBaseEventClass<E extends keyof ClientEvents> = new () => BaseEvent<E>;

export class ClientEventDecorator {
    @autowired private _eventManager: EventManager;
    
    build<T extends ConcreteBaseEventClass<keyof ClientEvents>>(...args: ClientEventArgs) {
        return (target: T) => {
            this._eventManager.clientEvents.push(new ClientEventData<keyof ClientEvents>({
                event: args[0],
                type: args[1],
                callback: (...args: ClientEvents[keyof ClientEvents]) => {
                    const instance = new target();
                    return instance.callback(...args);
                }
            }))
        };
    }
}

export function ClientEvent<T extends ConcreteBaseEventClass<keyof ClientEvents>>(...args: ClientEventArgs) {
    return new ClientEventDecorator().build<T>(...args);
}