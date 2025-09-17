import {autowired} from "ironbean";
import {SlashCommandsManager} from "../singletons/slash-commands-manager";
import {SlashCommand as SlashCommandData} from "../data/slash-command";
import {BaseSlashCommand} from "../commands/slash-commands/base-slash-command";

type SlashCommandArgs = [name: string, description: string, nsfw?: boolean]
type ConcreteBaseSlashCommandClass = new () => BaseSlashCommand;

class SlashCommandDecorator {
    @autowired private _slashCommandsManager: SlashCommandsManager;
    
    build<T extends ConcreteBaseSlashCommandClass>(...args: SlashCommandArgs) {
        return (target: T) => {
            this._slashCommandsManager.slashCommands.push(new SlashCommandData({
                name: args[0],
                description: args[1],
                callback: async (interaction) => {
                    const instance = new target();
                    return instance.execute(interaction);
                }
            }))
        };
    }
}

export function SlashCommand<T extends ConcreteBaseSlashCommandClass>(...args: SlashCommandArgs) {
    return new SlashCommandDecorator().build<T>(...args);
}