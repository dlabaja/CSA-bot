import {RepliableInteraction} from "discord.js";

export abstract class BaseSlashCommand {
    public abstract execute(interaction: RepliableInteraction): Promise<void>;
}