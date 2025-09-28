import {RepliableInteraction} from "discord.js";
import {SlashCommand} from "../../data/slash-command";

export abstract class BaseSlashCommand {
    public abstract execute(interaction: RepliableInteraction, command: SlashCommand): Promise<void>;
}