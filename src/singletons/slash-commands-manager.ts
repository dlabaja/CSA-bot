import {ISlashCommand, SlashCommand} from "../data/slash-command";
import {commands} from "../database/commands";
import {component} from "ironbean";
import {SlashCommandBuilder} from "discord.js";

@component
export class SlashCommandsManager {
    private readonly _slashCommands: ISlashCommand[];

    constructor() {
        this._slashCommands = commands;
    }

    get slashCommands(): SlashCommand[] {
        return this._slashCommands.map(x => new SlashCommand(x));
    }

    public getCommand(name: string): SlashCommand | null {
        const command = this._slashCommands.filter(x => x.name === name)[0];
        if (!command) {
            return null;
        }
        return new SlashCommand(command);
    }
    
    public getCommandDataJson(command: SlashCommand) {
        return new SlashCommandBuilder()
            .setName(command.name)
            .setDescription(command.description)
            .setNSFW(command.nsfw)
            .toJSON()
    }

    public getCommandsDataJson() {
        return this._slashCommands.map(cmd => {
            return this.getCommandDataJson(new SlashCommand(cmd))
        })
    }
}