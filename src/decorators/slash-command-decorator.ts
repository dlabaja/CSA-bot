import {autowired} from "ironbean";
import {SlashCommandsManager} from "../singletons/slash-commands-manager";
import {SlashCommandOption, SlashCommand as SlashCommandData} from "../data/slash-command";
import {BaseSlashCommand} from "../commands/slash-commands/base-slash-command";

interface ISlashCommandArgs {
    name: string,
    description: string,
    options?: SlashCommandOption[], 
    nsfw?: boolean
}
type ConcreteBaseSlashCommandClass = new () => BaseSlashCommand;

class SlashCommandDecorator {
    @autowired private _slashCommandsManager: SlashCommandsManager;
    
    build<T extends ConcreteBaseSlashCommandClass>(args: ISlashCommandArgs) {
        return (target: T) => {
            const {name, options, description, nsfw} = args;
            this._slashCommandsManager.slashCommands.push(new SlashCommandData({
                name: name,
                options: options || [],
                description: description,
                callback: async (interaction) => {
                    const instance = new target();
                    return instance.execute(interaction);
                },
                nsfw: nsfw || false
            }))
        };
    }
}

export function SlashCommand<T extends ConcreteBaseSlashCommandClass>(args: ISlashCommandArgs) {
    return new SlashCommandDecorator().build<T>(args);
}