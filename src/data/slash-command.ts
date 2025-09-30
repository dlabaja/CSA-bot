import {PermissionsBitField, ChatInputCommandInteraction} from "discord.js";
import {SlashCommandOptionType} from "../enums/slash-command-option-type.enum";

export interface ISlashCommandChoice<T> {
    name: string;
    value: T;
}

interface ISlashCommandOptionBase {
    name: Lowercase<string>;
    description: string;
    permissions?: PermissionsBitField;
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
    callback: (interaction: ChatInputCommandInteraction, command: SlashCommand) => Promise<void>;
    permissions?: PermissionsBitField;
}

type OptionWithNested = SlashCommandOption & { options?: SlashCommandOption[] };

export class SlashCommand {
    public name: Lowercase<string>;
    public options: SlashCommandOption[];
    public description: string;
    public nsfw: boolean;
    public callback: (interaction: ChatInputCommandInteraction, command: this) => Promise<void>;
    public permissions?: PermissionsBitField;
    private _subcommandPermissions?: Record<string, PermissionsBitField | undefined>;

    constructor(settings: ISlashCommand) {
        this.name = settings.name;
        this.options = settings.options;
        this.description = settings.description;
        this.nsfw = settings.nsfw;
        this.callback = settings.callback;
        this.permissions = settings.permissions;
    }

    public getSubcommandPermissions(): Record<string, PermissionsBitField | undefined> {
        if (!this._subcommandPermissions) {
            this._subcommandPermissions = Object.fromEntries(
                this._flattenOptions(this.options).map(o => [o.name, o.permissions] as const)
            );
        }
        return this._subcommandPermissions;
    }
    
    private _flattenOptions(options: OptionWithNested[]): OptionWithNested[] {
        return options.flatMap(opt => [
            opt,
            ...(opt.options ? this._flattenOptions(opt.options) : [])
        ]);
    }
}