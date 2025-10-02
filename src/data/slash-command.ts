import {ChatInputCommandInteraction, PermissionsBitField} from "discord.js";
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
        optional?: boolean;
        choices?: ISlashCommandChoice<string>[];
        maxLength?: number;
        minLength?: number;
    }) 
    | (ISlashCommandOptionBase & {
        type: SlashCommandOptionType.NUMBER;
        optional?: boolean;
        choices?: ISlashCommandChoice<string>[];
        maxValue?: number;
        minValue?: number; 
    })
    | (ISlashCommandOptionBase & {
        type: SlashCommandOptionType.INTEGER;
        optional?: boolean;
        choices?: ISlashCommandChoice<string>[];
        maxValue?: number;
        minValue?: number;
    })
    | (ISlashCommandOptionBase & {
        type: SlashCommandOptionType.BOOLEAN;
        optional?: boolean;
    })
    | (ISlashCommandOptionBase & {
        type: SlashCommandOptionType.SUB_COMMAND;
        options?: SlashCommandOption[];
        permissions?: PermissionsBitField;
    })
    | (ISlashCommandOptionBase & {
        type: SlashCommandOptionType.USER;
        optional?: boolean;
    })

export interface ISlashCommand {
    name: Lowercase<string>;
    options: SlashCommandOption[]
    description: string;
    nsfw: boolean;
    callback: (interaction: ChatInputCommandInteraction, command: SlashCommand) => Promise<void>;
    permissions?: PermissionsBitField;
}

export class SlashCommand {
    public name: Lowercase<string>;
    public options: SlashCommandOption[];
    public description: string;
    public nsfw: boolean;
    public callback: (interaction: ChatInputCommandInteraction, command: this) => Promise<void>;
    public permissions?: PermissionsBitField;
    private _subcommandPermissions: Record<string, PermissionsBitField | undefined>;
    private _subcommands: Extract<SlashCommandOption, {type: SlashCommandOptionType.SUB_COMMAND}>[];

    constructor(settings: ISlashCommand) {
        this.name = settings.name;
        this.options = settings.options;
        this.description = settings.description;
        this.nsfw = settings.nsfw;
        this.callback = settings.callback;
        this.permissions = settings.permissions;
    }

    get subcommandPermissions(): Record<string, PermissionsBitField | undefined> {
        if (!this._subcommandPermissions) {
            this._subcommandPermissions = Object.fromEntries(
                this.subcommands.map(x => [x.name, x.permissions])
            );
        }
        return this._subcommandPermissions;
    }
    
    get subcommands(): Extract<SlashCommandOption, {type: SlashCommandOptionType.SUB_COMMAND}>[] {
        if (!this._subcommands) {
            this._subcommands = this._flattenOptions(this.options).filter(x => x.type === SlashCommandOptionType.SUB_COMMAND);
        }
        return this._subcommands;
    }
    
    private _flattenOptions(options: SlashCommandOption[]): SlashCommandOption[] {
        const list: SlashCommandOption[] = []
        options.forEach(o => {
            if (o.type === SlashCommandOptionType.SUB_COMMAND && o.options) {
                list.push(...this._flattenOptions(o.options));
            }
            list.push(o);
        })
        return list;
    }
}