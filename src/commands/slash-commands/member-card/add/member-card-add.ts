import {ChatInputCommandInteraction} from "discord.js";
import {SlashCommand} from "../../../../data/slash-command";

export class MemberCardAdd {
    public async execute(interaction: ChatInputCommandInteraction, command: SlashCommand) {
        await interaction.reply({
            content: "Uživatel přidán",
            flags: ["Ephemeral"]
        })
    }
}