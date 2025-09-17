import {RepliableInteraction} from "discord.js";
import {BaseSlashCommand} from "../base-slash-command";
import {SlashCommand} from "../../../decorators/slash-command-decorator";

@SlashCommand("ping", "Replies with Pong!")
export class PingCommand extends BaseSlashCommand {
    async execute(interaction: RepliableInteraction): Promise<void> {
        await interaction.reply("Pong!")
    }
}