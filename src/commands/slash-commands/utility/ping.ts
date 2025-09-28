import {RepliableInteraction} from "discord.js";
import {BaseSlashCommand} from "../base-slash-command";
import {RegisterSlashCommand} from "../../../decorators/register-slash-command";

@RegisterSlashCommand({
    name: "ping",
    description: "Replies with Pong!"
})
export class PingCommand extends BaseSlashCommand {
    async execute(interaction: RepliableInteraction): Promise<void> {
        await interaction.reply("Pong!")
    }
}