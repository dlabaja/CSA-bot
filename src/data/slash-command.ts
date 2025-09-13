import {RepliableInteraction} from "discord.js";

export interface ISlashCommand {
    name: string;
    description: string;
    nsfw?: boolean;
    callback: (interaction: RepliableInteraction) => Promise<void>;
}

export class SlashCommand {
    public name: string;
    public description: string;
    public nsfw?: boolean;
    public callback: (interaction: RepliableInteraction) => Promise<void>;
    
    constructor(settings: ISlashCommand) {
        this.name = settings.name;
        this.description = settings.description;
        this.nsfw = settings.nsfw;
        this.callback = settings.callback;
    }
}