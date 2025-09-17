import {SlashCommand} from "../data/slash-command";
import {component} from "ironbean";
import {SlashCommandBuilder} from "discord.js";

@component
export class SlashCommandsManager {
    private readonly _slashCommands: SlashCommand[];

    constructor() {
        this._slashCommands = [];
    }

    get slashCommands(): SlashCommand[] {
        return this._slashCommands;
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