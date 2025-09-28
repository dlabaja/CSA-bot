import {RepliableInteraction} from "discord.js";
import {SlashCommandOptionType} from "../enums/slash-command-option-type.enum";

export interface ISlashCommandChoice<T> {
    name: string;
    value: T;
}

interface ISlashCommandOptionBase {
    name: Lowercase<string>;
    description: string;
}

export type SlashCommandOption = 
    | (ISlashCommandOptionBase & {
        type: SlashCommandOptionType.STRING;
        required?: boolean;
        choices?: ISlashCommandChoice<string>[];
        maxLength?: number;
        minLength?: number;
    }) 
    | (ISlashCommandOptionBase & {
        type: SlashCommandOptionType.NUMBER;
        required?: boolean;
        choices?: ISlashCommandChoice<string>[];
        maxValue?: number;
        minValue?: number; 
    })
    | (ISlashCommandOptionBase & {
        type: SlashCommandOptionType.INTEGER;
        required?: boolean;
        choices?: ISlashCommandChoice<string>[];
        maxValue?: number;
        minValue?: number;
    })
    | (ISlashCommandOptionBase & {
        type: SlashCommandOptionType.BOOLEAN;
        required?: boolean;
    })
    | (ISlashCommandOptionBase & {
        type: SlashCommandOptionType.SUB_COMMAND;
        options?: SlashCommandOption[];
    })
    | (ISlashCommandOptionBase & {
        type: SlashCommandOptionType.USER;
        required?: boolean;
    })

export interface ISlashCommand {
    name: Lowercase<string>;
    options: SlashCommandOption[]
    description: string;
    nsfw: boolean;
    callback: (interaction: RepliableInteraction, command: SlashCommand) => Promise<void>;
}

export class SlashCommand {
    public name: Lowercase<string>;
    public options: SlashCommandOption[];
    public description: string;
    public nsfw: boolean;
    public callback: (interaction: RepliableInteraction, command: this) => Promise<void>;
    
    constructor(settings: ISlashCommand) {
        this.name = settings.name;
        this.options = settings.options;
        this.description = settings.description;
        this.nsfw = settings.nsfw;
        this.callback = settings.callback;
    }
}